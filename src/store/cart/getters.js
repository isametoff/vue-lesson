export default {
  productsDetailed: (state, getters, rootState, rootGetters) => {
    return state.products?.map((item) => {
      let product = rootGetters['products/one'](item.id);
      return { ...product, cnt: item.cnt };
    });
  },
  totalSum(state, getters) {
    return getters.productsDetailed?.reduce((total, pr) => {
      return total + pr.price * pr.cnt;
    }, 0);
  },
  totalCnt: (state) => state.products?.length,
  oneProduct: (state) => (id) =>
    state.products?.find((product) => (product.id === id ? product : 0)),
  inProccess: (state) => (id) => state.proccessId.includes(id),
  canAdd: (state, getters) => (id) =>
    !getters.inCart(id) && !getters.inProccess(id),
  canUpdate: (state, getters) => (id) =>
    getters.inCart(id) && !getters.inProccess(id),
  inCart: (state) => (id) => state.products?.some((product) => product.id == id),
  index: (state) => (id) => state.products?.findIndex((pr) => pr.id === id),
  item: (state, getters) => (id) => {
    let ind = getters.index(id);
    return ind === -1 ? null : state.products[ind];
  },
  itemCnt: (state, getters) => (id) => getters.item(id).cnt,
};
