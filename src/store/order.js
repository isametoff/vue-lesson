import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    order: [],
    orders: [],
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
    lengthOrderItem: (state) => state.order?.length,
    lengthProductsItems: (state) => state.order?.products?.length,
    orderItem: (state) => state.order,
    orderItems: (state) => state.orders,
    isToken: (state) => state.token !== '',
    isTokenPay: (state) => state.token !== false,
  },
  mutations: {
    addOrder(state, { data }) {
      state.order = data;
    },
    addOrders(state, { data }) {
      state.orders = data;
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
    async repeatOrder(
      { commit, rootGetters, getters, rootState },
      { tokenPay }
    ) {
      let { res } = await orderApi.repeat({
        tokenPay: tokenPay,
        token: rootGetters['user/valueToken'],
      });

      if (res === true) {
        commit('addOrderStore', []);
      }

      return res;
    },
    async deleteOrder(
      { commit, rootGetters, getters, rootState },
      { tokenPay }
    ) {
      let { res } = await orderApi.delete({
        tokenPay: tokenPay,
        token: rootGetters['user/valueToken'],
      });

      if (res === true) {
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
        commit('addOrder', { data: data.orderItem });
        commit('addTotalPrice', '');
      }

      return res;
    },
    async loadAll({ commit, state, getters, rootGetters }) {
      let { data, res } = await orderApi.loadAll({
        token: rootGetters['user/valueToken'],
      });

      if (data.tokenPay && data.orderItems.length > 0) {
        localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.tokenPay);
        commit('addTokenPay', { data: data.tokenPay });
      }
      if (res === true) {
        commit('addOrderStore', []);
        commit('addOrders', { data: data.orderItems });
        commit('addTotalPrice', '');
      }

      return res;
    },
    addOrderStore({ commit }, { order }) {
      commit('addOrderStore', { order });
    },
  },
};
