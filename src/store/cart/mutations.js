export default {
  setCart(state, { cart }) {
    state.products = cart;
  },
  setToken(state, { token }) {
    state.token = token;
  },
  add(state, { id }) {
    state.products.push({ id, cnt: 1 });
  },
  remove(state, { ind }) {
    state.products.splice(ind, 1);
  },
  // remove(state, id) {
  //   state.items = state.products.filter((product) => product.id !== id);
  // },
  setCnt(state, { id, cnt }) {
    state.products.find((product) =>
      product.id == id ? (product.cnt = cnt) : ''
    );
  },
  startProccess(state, id) {
    state.proccessId.push(id);
  },
  endProccess(state, rid) {
    state.proccessId = state.proccessId.filter((id) => id !== rid);
  },
};
