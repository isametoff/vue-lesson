import * as productsApi from '@/api/products.js';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    all: (state) => state.items,
    one: (state) => (id) => state.items.find((pr) => pr.id == id),
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
      let products = await productsApi.all();
      commit('setItems', products);
      return products;
    },
  },
};
