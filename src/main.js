import { createApp } from 'vue';
import App from './App';
import store from './store';
import router from './router/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

let app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router);

store.dispatch('user/autoLogin');
store.dispatch('cart/load');
store.dispatch('products/load').then(() => {
  app.mount('#app');
});

import 'bootstrap/dist/css/bootstrap.min.css';
