import axios from 'axios';
export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    all: (state) => state.items,
    product: (state) => (id) => state.items.find((item) => item.id == id),
    isRest: (state) => (id) =>
      state.items.some((item) => item.id == id && item.rest > 0),
    maxRest: (state) => (id, cnt) =>
      state.items.some((item) => item?.id == id && item.rest > cnt),
  },
  mutations: {
    setItems(state, products) {
      state.items = products;
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        let res = await axios.get('http://127.0.0.1:8000/api/products');
        const products = await res.data.data;
        commit('setItems', products);
        console.log(res.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
};

// function stub() {
//   return [
//     { id: 100, title: 'Ipnone 200', price: 12000, rest: 10 },
//     { id: 101, title: 'Samsung AAZ8', price: 22000, rest: 3 },
//     { id: 103, title: 'Nokia 3310', price: 5000, rest: 0 },
//     { id: 105, title: 'Huawei ZZ', price: 15000, rest: 8 },
//   ];
// }
