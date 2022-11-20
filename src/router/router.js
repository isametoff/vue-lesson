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

import guest from './middleware/guest';
import auth from './middleware/auth';
import middlewarePipeline from './middlewarePipeline';

let routes = [
  {
    path: '/',
    component: AppProductsList,
    name: 'catalog',
  },
  {
    path: '/cart',
    component: AppCart,
    name: 'cart',
  },
  {
    path: '/product/:id',
    component: AppProduct,
    name: 'product',
  },
  {
    path: '/signup',
    component: SignUp,
    name: 'signup',
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/signin',
    component: SignIn,
    name: 'signin',
    meta: {
      middleware: [guest],
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
  scrollBehavior(to, from, savedPosition) {
    const fromHistory = Boolean(savedPosition);

    if (fromHistory && store.getters['router/isRouterHistory']) {
      store.state.routerHistory?.splice(-1, 1);
    } else {
      store.dispatch('router/add', from);
    }

    return savedPosition || { x: 0, y: 0 };
  },
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

export default router;
