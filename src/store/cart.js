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
    itemsDetailed: (state, getters, rootState, rootGetters) => {
      return state.items.map((item) => {
        let product = rootGetters['products/product'](item.id);
        return { ...product, cnt: item.cnt };
      });
    },
    total: (state, getters) =>
      getters.itemsDetailed.reduce((t, i) => t + i.price * i.cnt, 0),
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
    setCnt({ commit, getters }, { id, cnt }) {
      if (getters.inCart(id)) {
        var item = getters.itemsDetailed.find((item) => item.id == id);
        var validCnt = Math.min(Math.max(cnt, 1), item.count);
      }
      !getters.inCart(id)
        ? commit('add', id)
        : cnt < 1
        ? commit('remove', id)
        : item.count >= cnt
        ? commit('setCnt', { id, cnt: validCnt })
        : '';
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
