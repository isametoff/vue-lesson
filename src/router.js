import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

import AppProductsList from '@/views/ProductsList';
import AppProduct from '@/views/Product';
import AppCart from '@/views/Cart';
import AppE404 from '@/views/E404';
import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';
import OfficeIndex from '@/views/office/Index';
import OfficeBase from '@/views/office/Base';
import OfficeOrders from '@/views/office/Orders';

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
    async beforeEnter(from, to, next) {
      await store.getters['user/ready'];
      store.getters['user/isLogin'] ? next({ name: 'office' }) : next();
    },
  },
  {
    path: '/office',
    component: OfficeBase,
    meta: { auth: true },
    children: [
      {
        path: '',
        component: OfficeIndex,
        name: 'office',
      },
      {
        path: 'orders',
        component: OfficeOrders,
        name: 'office-orders',
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
  if (to.meta.auth) {
    await store.getters['user/ready'];
    store.getters['user/isLogin'] ? next() : next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
