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
    let errorsRequest = error.response.data;
    console.log("🚀 ~ file: index.js ~ line 27 ~ error.response.config", error)

    if ('errorAlert' in config) {
      let { errorAlert } = config;
      store.dispatch('alerts/add', {
        text: 'Ошибка ответа от сервера ' + errorAlert.text,
        fixed: errorAlert.fixed,
      });
      return { data: { res: false, data: data } };
    }

    if (errorsRequest) {
      return { data: { res: false, data: errorsRequest } };
    }

    return Promise.reject(error);
  }
);

export default store;
