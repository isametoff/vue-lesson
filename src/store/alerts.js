// import actions from './cart/actions';

export default {
  namespaced: true,
  state: {
    messages: [],
    lastId: 0,
    proccessId: [],
  },
  getters: {
    all: (state) => state.messages,
    length: (state) => state.messages.length > 0,
    isMessage: (state) => (text) =>
      state.messages.some((message) => message.text == text),
    index: (state) => (id) =>
      state.messages.findIndex((message) => message.id === id),
    inProccess: (state) => (id) => state.proccessId.includes(id),
  },
  mutations: {
    add(state, { text, fixed }) {
      state.messages.push({
        id: ++state.lastId,
        message: text,
        fixed,
      });
    },
    clear(state) {
      state.messages = [];
    },
    remove(state, id) {
      state.messages = state.messages.filter((id) => id !== id);
    },
    startProccess(state, id) {
      state.proccessId.push(id);
    },
    endProccess(state, rid) {
      state.proccessId = state.proccessId.filter((id) => id !== rid);
    },
  },
  actions: {
    add({ commit, dispatch, getters, rootGetters, state }, payload) {
      if (
        !getters.inProccess(state.lastId) &&
        typeof Boolean(payload.fixed) === 'boolean'
        // &&
        // payload.fixed !== undefined
      ) {
        commit('add', { text: payload.text, fixed: payload.fixed });
        if (payload.fixed === false) {
          setTimeout(() => {
            let { lastId } = state.lastId;
            commit('startProccess', state.lastId);
            commit('remove', { ind: getters.index({ id: lastId }) });
            commit('endProccess', state.lastId);
          }, 3000);
        }
      }
      console.log(state.messages);
    },
    remove({ commit }, payload) {
      commit('remove', { ind: getters.index(id) });
    },
    clear(commit) {
      commit('clear');
    },
  },
};
