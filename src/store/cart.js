export default {
  namespaced: true,
  state: {
    items: [],
    // total: [],
  },
  getters: {
    productCnt: (state) => (id) =>
      state.items.find((item) => (item.id == id ? item.cnt : '')),
    inCart: (state) => (id) => state.items.some((item) => item.id == id),
    length: (state) => state.items.length,
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
    cartPlus(state, id) {
      state.items.find((item) => (item.id == id ? item.cnt++ : ''));
      // state.items[id].cnt += 1;
    },
    cartMinus(state, id) {
      state.items.find((item) => (item.id == id ? item.cnt-- : ''));
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
    cartPlus({ commit, getters }, id) {
      !getters.inCart(id) ? commit('add', id) : commit('cartPlus', id);
    },
    cartMinus({ commit, getters }, id) {
      getters.productCnt(id) > 1
        ? commit('cartMinus', id)
        : getters.inCart(id)
        ? commit('remove', id)
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
