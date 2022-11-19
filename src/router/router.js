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

import guest from './middleware/guest';
import auth from './middleware/auth';

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
    meta: {
      // middleware: [auth],
    },
  },
  {
    path: '/checkout',
    component: CheckoutBase,

    children: [
      {
        path: '',
        component: CheckoutIndex,
        name: 'checkout',
        meta: {
          middleware: [auth],
        },
      },
      {
        path: 'orders',
        component: CheckoutOrders,
        name: 'checkout-orders',
        meta: {
          middleware: [auth],
        },
      },
      // {
      //   path: 'auth',
      //   component: CheckoutAuth,
      //   name: 'checkout-auth',
      //   meta: {
      //     middleware: [guest],
      //   },
      // },
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

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.auth && !auth.isLoggedIn()) {
//     await store.getters['user/isLogin'];
//     store.getters['user/isLogin'] ? next() : next({ name: 'signin' });
//   } else if (to.meta.authCheckout) {
//     await store.getters['user/isLogin'];
//     store.getters['user/isLogin'] ? next() : next({ name: 'checkout-auth' });
//   } else {
//     next();
//   }
// });

export default router;
