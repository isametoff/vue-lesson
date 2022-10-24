import actions from './cart/actions';

export default {
  namespaced: true,
  state: {
    messages: [],
  },
  getters: {
    all: (state) => state.messages,
    length: (state) => state.messages.length > 0,
    isMessage: (state) => (text) =>
      state.messages.some((message) => message.text == text),
  },
  mutations: {
    add(state, { text }) {
      state.messages.push({ text }); // hw: type, mb time
    },
    cleare(state) {
      state.messages = [];
    },
    remove(state, { text }) {
      state.messages = state.messages.filter(
        (message) => message.text !== text
      );
      //   state.messages.push({ text }); // hw: type, mb time
    },
  },
  actions: {
    add({ commit, dispatch, getters, rootGetters }, payload) {
      if (rootGetters['products/notItems']) {
        if (
          (payload.update === true && !getters.isMessage(payload.text)) ||
          payload.update === false
        ) {
          commit('add', payload);
        }
        if (
          (payload.update === true && getters.length) ||
          payload.update === false
        ) {
          setTimeout(() => {
            dispatch('products/load', '', { root: true });
            dispatch('cart/load', '', { root: true });
          }, 5000);
        }
        if (payload.update === false) {
          setTimeout(() => {
            commit('remove', payload.text);
          }, 3000);
        }
      } else {
        commit('cleare');
      }
    },
    remove({ commit }, payload) {
      commit('remove', payload);
    },
    cleare({ commit }) {
      commit('cleare');
    },
  },
};
