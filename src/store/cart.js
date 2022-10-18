const BASEURL = 'http://127.0.0.1:8000/api/cart';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
    token: null,
  },
  getters: {
    inCart: (state) => (id) => state.items?.some((item) => item.id == id),
    length: (state) => state.items?.length,
    oneProduct: (state) => (id) =>
      state.items.find((item) => (item.id == id ? item : 0)),
    itemsDetailed: (state, getters, rootState, rootGetters) => {
      return state.items?.map((item) => {
        let product = rootGetters['products/product'](item.id);
        return { ...product, cnt: item.cnt };
      });
    },
    total: (state, getters) =>
      getters.itemsDetailed?.reduce((t, i) => t + i.price * i.cnt, 0),
  },
  mutations: {
    load(state, { cart, token }) {
      console.log(token);
      console.log(state.cart, 'state.items-load-mutations-in');
      console.log(state.token, 'token');
      state.items.push(cart);
      state.token = token;
      console.log(state.cart, 'state.items-load-mutations-out');
      console.log(state.token, 'token');
    },
    add(state, id) {
      console.log(state.items, 'state.items-mutations');
      state.items.push({ id: id, cnt: 1 });
    },
    remove(state, { id }) {
      state.items = state.items.filter((item) => item.id != id);
    },
    setCnt(state, { id, cnt }) {
      state.items.find((item) => (item.id == id ? (item.cnt = cnt) : ''));
    },
  },
  actions: {
    async load({ commit, state }) {
      try {
        let oldToken = localStorage.getItem('CART__TOKEN');
        let res = await axios.post(`${BASEURL}`, { oldToken });
        let { cart, token, needUpdate } = res.data;
        console.log(token, 'token');
        console.log(cart, 'cart');

        if (needUpdate) {
          localStorage.setItem('CART__TOKEN', token);
        }
        cart ? commit('load', {token}) : '';
        cart.id > 0 ? commit('load', {cart}) : '';
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async add({ commit, getters, state }, id) {
      // console.log(state.items, 'state.items-actions');
      console.log(state.token, 'add');

      if (!getters.inCart(id)) {
        let response = await axios.post(`${BASEURL}/add`, {
          token: state.token,
          id: id,
        });
        let res = await response.data;

        if (res) {
          commit('add', id);
        }
      }
    },
    async remove({ commit, getters, state }, id) {
      if (getters.inCart(id)) {
        let response = await axios.post(`${BASEURL}/remove`, {
          token: state.token,
          id: id,
        });
        let res = await response.data;

        if (res) {
          commit('remove', id);
        }
      }
    },
    async setCnt({ commit, getters, state }, { id, cnt }) {
      if (getters.inCart(id)) {
        let response = await axios.post(`${BASEURL}/count`, {
          token: state.token,
          id: id,
          cnt: cnt,
        });
        let res = await response.data;
        var item = getters.itemsDetailed.find((item) => item.id == id);
        var validCnt = Math.min(Math.max(cnt, 1), item.rest);
      }
      !getters.inCart(id)
        ? commit('add', id)
        : cnt < 1
        ? commit('remove', id)
        : item.rest >= cnt
        ? commit('setCnt', { id, cnt: validCnt })
        : '';
    },
  },
};

/*
	inCart(state){
		return function(id){
			return state.items.some(item => item.id == id);
		}
	}

	inCart: state => id => state.items.some(item => item.id == id)
*/
