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
    console.log(error.response);
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
    }

    return Promise.reject(error);
  }
);

// addErrorHandler(function(error){
// 	let config = error.response.config;

// 	if('errorAlert' in config){
// 		store.dispatch('alerts/add', {
// 			text: 'Ошибка ответа от сервера ' + config.errorAlert
// 		});

// 		return false;
// 	}

// 	return Promise.reject(error);
// });

export default store;
