import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    order: [],
    orderStore: [],
    tokenPay: '',
    // tokenPay: localStorage.getItem('token_pay') || false,
    totalPrice: 0,
  },
  getters: {
    allOrderItems: (state) =>
      state.orderStore?.length > 0 ? state.orderStore : false,
    isOrderStore: (state) => state.orderStore?.length > 0,
    valueTokenPay: (state, getters) =>
      state.tokenPay ? state.tokenPay : localStorage.getItem('token_pay'),
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
    async order({ commit, rootGetters, getters, rootState }) {
      console.log("🚀 ~ file: order.js ~ line 45 ~ order ~ rootGetters['user/valueToken']", rootGetters['user/valueToken'])
      let { data, res } = await orderApi.order({
        token: rootGetters['user/valueToken'],
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
    async load({ commit, state, getters, rootGetters }) {
      let { data, res } = await orderApi.load({
        tokenPay: getters.valueTokenPay,
        token: rootGetters['user/valueToken'],
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
