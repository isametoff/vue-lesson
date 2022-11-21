import * as productsApi from '@/api/products.js';
// import actions from './cart/actions';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    isProducts: (state) => state.items?.length > 0,
    notItems: (state) => state.items?.length < 1 || state.items === null,
    all: (state) => state.items,
    one: (state) => (id) => state.items?.find((pr) => pr.id == id),
    isRest: (state) => (id) =>
      state.items.some((item) => item.id == id && item.rest > 0),
    maxRest: (state) => (id, cnt) =>
      state.items.some((item) => item?.id == id && item.rest > cnt),
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    async load({ commit }) {
      let response = await productsApi.all();
      console.log(
        '🚀 ~ file: products.js ~ line 28 ~ load ~ response.res',
        response.res
      );
      if (response.res) {
        commit('setItems', response.data.data);
      } else {
        commit('setItems', []);
      }
      console.log(
        '🚀 ~ file: products.js ~ line 32 ~ load ~ response.data',
        response.data.data
      );
    },
  },
};
