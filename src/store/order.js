import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    order: [],
    orderStore: [],
    tokenPay: '',
    totalPrice: 0,
  },
  getters: {
    allOrderItems: (state) =>
      state.orderStore?.length > 0 ? state.orderStore : false,
    isOrderStore: (state) => state.orderStore?.length > 0,
    valueTokenPay: (state, getters) =>
      state.tokenPay ? state.tokenPay : localStorage.getItem('token_pay'),
    lengthOrderItems: (state) => state.order?.length,
    lengthProductsItems: (state) => state.order?.products?.length,
    orderItems: (state) => state.order,
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
      let { data, res } = await orderApi.order({
        token: rootGetters['user/valueToken'],
        order: getters.allOrderItems,
      });

      if (data.tokenPay) {
        // localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.tokenPay);
        commit('addTokenPay', { data: data.tokenPay });
      }
      if (res === true) {
        commit('addOrderStore', []);
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
        commit('addOrder', { data: data.orderItem[0] });
        commit('addTotalPrice', '');
      }
      console.log(
        '🚀 ~ file: order.js ~ line 67 ~ load ~ { tokenPay }',
        state.order
      );

      return res;
    },
    async loadAll({ commit, state, getters, rootGetters }) {
      let { data, res } = await orderApi.loadAll({
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
        commit('addOrder', { data: data.orderItem[0] });
        commit('addTotalPrice', '');
      }
      console.log(
        '🚀 ~ file: order.js ~ line 67 ~ load ~ { tokenPay }',
        state.order
      );

      return res;
    },
    addOrderStore({ commit }, { order }) {
      commit('addOrderStore', { order });
    },
  },
};
