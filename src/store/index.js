import { createStore } from 'vuex';

import cart from './cart';
import products from './products';
import user from './user';
import alerts from './alerts';
import order from './order';

import { addResponseHandler } from '@/api/http';

const store = createStore({
  modules: {
    cart,
    products,
    user,
    alerts,
    order,
  },
  strict: process.env.NODE_ENV !== 'production',
});

addResponseHandler(
  function (response) {
    return { data: { res: true, data: response.data } };
  },
  function (error) {
    let config = error.response.config;
    let errorsRequest = error.response.data;

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
