export default {
  namespaced: true,
  state: { routerHistory: [] },
  getters: {
    all: (state) => state.routerHistory,
    isRouterHistory: (state) => state.routerHistory?.length > 0,
    lastName: (state, getters) =>
      state.routerHistory?.slice(-1)[0].from.name ?? 'catalog',
  },
  mutations: {
    add(state, { from }) {
      state.routerHistory.push({ from });
    },
  },
  actions: {
    add({ commit }, from) {
      commit('add', { from });
    },
  },
};
