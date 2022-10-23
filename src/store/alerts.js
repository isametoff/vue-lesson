export default {
  namespaced: true,
  state: {
    messages: [],
  },
  getters: {
    all: (state) => state.messages,
  },
  mutations: {
    add(state, { text }) {
      state.messages.push({ text }); // hw: type, mb time
    },
    remove(state, { text }) {
      state.messages = state.messages.filter(
        (message) => message.text !== text
      );
      //   state.messages.push({ text }); // hw: type, mb time
    },
  },
  actions: {
    add({ commit }, payload) {
      commit('add', payload);
      setTimeout(() => {
        commit('remove', payload);
      }, 3000);
    },
    remove({ commit }, payload) {
      commit('remove', payload);
    },
  },
};
