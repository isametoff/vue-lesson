export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    productCnt: (state) => (id) =>
      state.items.find((item) => (item.id == id ? item.cnt : '')),
    inCart: (state) => (id) => state.items.some((item) => item.id == id),
    length: (state) => state.items.length,
    oneProduct: (state) => (id) =>
      state.items.find((item) => (item.id == id ? item : '')),
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
    cartPlus({ commit, getters, rootGetters }, id) {
      rootGetters['products/isRest'](id) && !getters.inCart(id)
        ? commit('add', id)
        : !rootGetters['products/maxRest'](getters.oneProduct(id))
        ? ''
        : commit('cartPlus', id);
    },
    cartMinus({ commit, getters }, id) {
      getters.inCart(id) && getters.productCnt(id) < '2'
        ? commit('remove', id)
        : getters.inCart(id) && getters.productCnt(id) > '1'
        ? commit('cartMinus', id)
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
