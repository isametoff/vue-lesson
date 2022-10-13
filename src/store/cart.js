export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    inCart: (state) => (id) => state.items.some((item) => item.id == id),
    length: (state) => state.items.length,
    oneProduct: (state) => (id) =>
      state.items.find((item) => (item.id == id ? item : 0)),
    // priceTotal: (state) => {
    //   return state.items.reduce((acc, price) => {
    //     return (total = acc + price);
    //   }, 0);
    // },
    // total: (state, getter, rootState, rootGetters) rootGetters
  },
  mutations: {
    add(state, id) {
      state.items.push({ id, cnt: 1 });
    },
    remove(state, id) {
      state.items = state.items.filter((item) => item.id != id);
    },
    setCnt(state, { id, cnt }) {
      state.items.find((item) => (item.id == id ? (item.cnt = cnt) : ''));
    },
  },
  actions: {
    add({ commit, getters }, id) {
      if (!getters.inCart(id)) {
        commit('add', id);
      }
    },
    remove({ commit, getters }, id) {
      if (getters.inCart(id)) {
        commit('remove', id);
      }
    },
    setCnt({ commit, getters, rootGetters }, { id, cnt }) {
      console.log(getters.oneProduct(id), 'setCnt');
      !getters.oneProduct(id)
        ? commit('add', id)
        : cnt < 1
        ? commit('remove', id)
        : commit('setCnt', { id, cnt });
    },
  },
};

/*
	inCart(state){
		return function(id){
			return state.items.some(item => item.id == id);
		}
	}

	inCart: state => id => state.items.some(item => item.id == id)
*/
