import * as productsApi from '@/api/products.js';
// import actions from './cart/actions';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    notItems: (state) => state.items?.length < 1 || state.items === null,
    all: (state) => (state.items?.length > 0 ? state.items : state.fakeItems),
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
      response.res
        ? commit('setItems', response.data.data)
        : commit('setItems', response.data);
    },
  },
};
