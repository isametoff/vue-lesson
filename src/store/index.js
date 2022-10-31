import { createStore } from 'vuex';

import cart from './cart';
import products from './products';
import user from './user';
import alerts from './alerts';

import { addResponseHandler } from '@/api/http';

const store = createStore({
  modules: {
    cart,
    products,
    user,
    alerts,
  },
  strict: process.env.NODE_ENV !== 'production',
});

addResponseHandler(
  function (response) {
    return { data: { res: true, data: response.data } };
  },
  function (error) {
    console.log('🚀 ~ file: index.js ~ line 25 ~ error', error.response);
    let config = error.response.config;

    if ('errorAlert' in config) {
      let { errorAlert } = config;

      if (typeof errorAlert === 'string') {
        errorAlert = { text: errorAlert };
      }

      store.dispatch('alerts/add', {
        text: 'Ошибка ответа от сервера ' + errorAlert.text,
        fixed: errorAlert.fixed,
      });

      return { data: { res: false, data: null } };
    } else {
      return { data: { res: false, data: error.response.data } };
    }

    // return Promise.reject(error);
  }
);

export default store;
