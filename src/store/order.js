import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    order: [],
    orderStore: [],
    accessToken: localStorage.getItem('access_token') || '',
    tokenPay: localStorage.getItem('token_pay') || false,
    totalPrice: 0,
  },
  getters: {
    allOrderItems: (state) =>
      state.orderStore?.length > 0 ? state.orderStore : false,
    isOrderStore: (state) => state.orderStore?.length > 0,
    valueTokenPay: (state, getters) => state.tokenPay,
    valueAccessToken: (state, getters) => state.accessToken,
    lengthOrderItems: (state) => state.order?.length,
    orderItems: (state) => state.order,
    totalPrice: (state) => state.totalPrice,
    totalPrice: (state) => state.totalPrice,
    isToken: (state) => state.token !== '',
    isTokenPay: (state) => state.token !== false,
  },
  mutations: {
    addOrder(state, { data }) {
      state.order = data;
    },
    addOrderStore(state, { order }) {
      state.orderStore = order;
    },
    addTokenPay(state, { data }) {
      state.tokenPay = data;
    },
    addTotalPrice(state, { data }) {
      state.totalPrice = data;
    },
  },
  actions: {
    async order({ commit, state, getters }) {
      let { data, res } = await orderApi.order({
        token: getters.valueAccessToken,
        order: getters.allOrderItems,
      });

      if (data.tokenPay && data.orderItems.length > 0) {
        localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.tokenPay);
        commit('addTokenPay', { data: data.tokenPay });
      }
      if (res === true) {
        commit('addOrderStore', []);
        commit('addOrder', { data: data.orderItems });
        commit('addTotalPrice', { data: data.totalPrice });
      }

      return res;
    },
    async load({ commit, state, getters }) {
      let { data, res } = await orderApi.load({
        tokenPay: getters.valueTokenPay,
        token: getters.valueAccessToken,
      });

      if (data.tokenPay && data.orderItems.length > 0) {
        localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.tokenPay);
        commit('addTokenPay', { data: data.tokenPay });
      }
      if (res === true) {
        commit('addOrderStore', []);
        commit('addOrder', { data: data.orderItems });
        commit('addTotalPrice', { data: data.totalPrice });
      }

      return res;
    },
    addOrderStore({ commit }, { order }) {
      commit('addOrderStore', { order });
    },
  },
};
