import * as orderApi from '@/api/order.js';

export default {
  namespaced: true,
  state: {
    order:[],
    token: localStorage.getItem('access_token') || '',
  },
  getters: {},
  mutations: {},
  actions: {
    async autoLogin({ commit, state, getters }) {
      let token = state.token;
      let {} = state.order;
      
      if (getters.isToken) {
        let { res, data } = await orderApi.check({ token });

        if (res === true) {
          commit('setUser', data);  
        }
      }
    },
  },
};
