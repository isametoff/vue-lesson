import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    order: [],
    orders: [],
    orderStore: [],
    orderId: '',
    totalPrice: 0,
  },
  getters: {
    allOrderItems: (state) =>
      state.orderStore?.length > 0 ? state.orderStore : false,
    isOrderStore: (state) => state.orderStore?.length > 0,
    valueOrderId: (state, getters) =>
      state.orderId ? state.orderId : localStorage.getItem('token_pay'),
    lengthOrderItem: (state) => state.order?.length,
    lengthProductsItems: (state) => state.order?.products?.length,
    orderItem: (state) => state.order,
    orderItems: (state) => state.orders,
    isToken: (state) => state.orderId !== '',
    isOrderId: (state) => state.orderId !== false,
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
    addOrderId(state, { data }) {
      state.orderId = data;
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

      if (data.orderId) {
        // localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.orderId);
        commit('addOrderId', { data: data.orderId });
      }
      if (res === true) {
        commit('addOrderStore', []);
      }

      return res;
    },
    async repeatOrder(
      { commit, rootGetters, getters, rootState },
      { orderId }
    ) {
      let { res } = await orderApi.repeat({
        orderId: orderId,
        token: rootGetters['user/valueToken'],
      });

      if (res === true) {
        commit('addOrderStore', []);
      }

      return res;
    },
    async deleteOrder(
      { commit, rootGetters, getters, rootState },
      { orderId }
    ) {
      let { res } = await orderApi.deleteOrder({
        orderId: orderId,
        token: rootGetters['user/valueToken'],
      });

      if (res === true) {
      }

      return res;
    },
    async load({ commit, state, getters, rootGetters }) {
      let { data, res } = await orderApi.load({
        orderId: getters.valueorderId,
        token: rootGetters['user/valueToken'],
      });
      if (data.orderId && data.orderItems.length > 0) {
        localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.orderId);
        commit('addOrderId', { data: data.orderId });
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

      if (data.orderId && data.orderItems.length > 0) {
        localStorage.setItem('token_pay', '');
        localStorage.setItem('token_pay', data.orderId);
        commit('addOrderId', { data: data.orderId });
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
