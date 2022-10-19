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
      console.log(state.token, 'stateloadtoken');
      console.log(state.items, 'stateloaditems');
      state.items = cart;
      state.token = token;
    },
    add(state, id) {
      console.log(state.items);
      console.log(state.token);
      state.items.push({ id: id, cnt: 1 });
    },
    remove(state, id) {
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
        const { cart, token, needUpdate } = await res.data;
        console.log({ token, needUpdate, cart }, 'loadtoken');
        console.log(state.token, 'stateloadtoken');
        console.log(state.items, 'stateloaditems');

        if (needUpdate) {
          localStorage.setItem('CART__TOKEN', token);
        }
        commit('load', { cart, token });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async add({ commit, getters, state }, id) {
      console.log(state.items);
      console.log(state.token);

      if (!getters.inCart(id)) {
        let response = await axios.post(`${BASEURL}/add`, {
          oldToken: state.token,
          id: id,
        });
        let addToData = await response.data;
        console.log(addToData, 'addToData');

        if (addToData) {
          commit('add', id);
        }
      }
    },
    async remove({ commit, getters, state }, id) {
      if (getters.inCart(id)) {
        let response = await axios.post(`${BASEURL}/remove`, {
          oldToken: state.token,
          id: id,
        });
        let removeData = await response.data;

        if (removeData) {
          commit('remove', id);
        }
      }
    },
    async setCnt({ commit, getters, state }, { id, cnt }) {
      let response = await axios.post(`${BASEURL}/count`, {
        oldToken: state.token,
        id: id,
        cnt: cnt,
      });
      let setData = await response.data;
      var item = getters.itemsDetailed.find((item) => item.id == id);
      if (setData) {
        cnt < 1
          ? commit('remove', id)
          : !getters.inCart(id)
          ? commit('add', id)
          : item.rest >= cnt
          ? commit('setCnt', { id: id, cnt: cnt })
          : '';
      }
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
