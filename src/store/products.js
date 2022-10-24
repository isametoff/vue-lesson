import * as productsApi from '@/api/products.js';
import actions from './cart/actions';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    notItems: (state) => state.items.length < 1,
    all: (state) => (state.items?.length > 0 ? state.items : state.fakeItems),
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
    async load({ getters, commit, dispatch }) {
      try {
        let response = await productsApi.all();
        if (response) {
          commit('setItems', response);
        }
        // if (!getters.notItems) {
        //   dispatch(
        //     'alerts/cleare',
        //     { name: 'products' },
        //     {
        //       root: true,
        //     }
        //   );
        // }
      } catch (e) {
        dispatch(
          'alerts/add',
          {
            name: 'load' ,
            text: 'Ошибка сервера',
            update: true,
          },
          { root: true }
        );
      }
    },
  },
};
