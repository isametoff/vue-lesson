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
    // valueTokenPay: (state, getters) => state.tokenPay,
    valueTokenPay: (state, getters) =>
      getters.isOrderStore ? false : state.tokenPay,
    totalOrderItems: (state) => state.order?.length,
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
      let token = state.accessToken;

      let { data, res } = await orderApi.order({
        tokenPay: getters.valueTokenPay,
        token,
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
    addOrderStore({ commit }, { order }) {
      commit('addOrderStore', { order });
    },
  },
};
