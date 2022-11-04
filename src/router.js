import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

import AppProductsList from '@/views/ProductsList';
import AppProduct from '@/views/Product';
import AppCart from '@/views/Cart';
import AppE404 from '@/views/E404';
import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';
import CheckoutIndex from '@/views/checkout/Index';
import CheckoutBase from '@/views/checkout/Base';
import CheckoutOrders from '@/views/checkout/Orders';
import CheckoutAuth from '@/views/checkout/Auth';

let routes = [
  {
    name: 'catalog',
    path: '/',
    component: AppProductsList,
  },
  {
    name: 'cart',
    path: '/cart',
    component: AppCart,
  },
  {
    name: 'product',
    path: '/product/:id',
    component: AppProduct,
  },
  {
    name: 'signup',
    path: '/signup',
    component: SignUp,
  },
  {
    name: 'signin',
    path: '/signin',
    component: SignIn,
    // async beforeEnter(from, to, next) {
    //   await store.getters['user/ready'];
    //   store.getters['user/isLogin'] ? next({ name: 'checkout' }) : next();
    // },
  },
  {
    path: '/checkout',
    component: CheckoutBase,

    children: [
      {
        path: '',
        component: CheckoutIndex,
        name: 'checkout',
        meta: { authCheckout: true },
      },
      {
        path: 'orders',
        component: CheckoutOrders,
        name: 'checkout-orders',
        meta: { authCheckout: true },
      },
      {
        path: 'auth',
        component: CheckoutAuth,
        name: 'checkout-auth',
        async beforeEnter(from, to, next) {
          await store.getters['user/ready'];
          store.getters['user/isLogin'] ? next({ name: 'checkout' }) : next();
        },
      },
    ],
  },
  {
    path: '/:any(.*)',
    component: AppE404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth && !auth.isLoggedIn()) {
    await store.getters['user/ready'];
    store.getters['user/isLogin'] ? next() : next({ name: 'signin' });
  } else if (to.meta.authCheckout) {
    await store.getters['user/ready'];
    store.getters['user/isLogin'] ? next() : next({ name: 'checkout-auth' });
  } else {
    next();
  }
});

export default router;
