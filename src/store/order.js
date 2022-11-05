import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('access_token') || '',
  },
  getters: {
    isToken: (state) => state.token !== '',
  },
  mutations: {},
  actions: {
    async order({ commit, state, getters }, { order }) {
      let orderJson = JSON.stringify(order);
      let ord = [order];
      console.log("🚀 ~ file: order.js ~ line 17 ~ order ~ ord", ord)
      console.log('🚀 ~ file: order.js ~ line 13 ~ order ~ { order }', {
        order,
      });
      let token = state.token;

      console.log(
        '🚀 ~ file: order.js ~ line 17 ~ order ~ getters.isToken',
        getters.isToken
      );
      if (getters.isToken) {
        let { res, data } = await orderApi.order({ token, order: ord });
        console.log('🚀 ~ file: order.js ~ line 18 ~ order ~ { res, data }', {
          res,
          data,
        });
      }
    },
  },
};
