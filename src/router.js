import { createRouter, createWebHistory } from 'vue-router'

import AppProductsList from '@/components/ProductsList';
import AppProduct from '@/components/Product';
import AppCart from '@/components/Cart';
import AppCheckout from '@/components/Checkout';
import AppE404 from '@/components/E404';
import SignUp from '@/components/SignUp';

const routes = [
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
    name: 'checkout',
    path: '/order',
    component: AppCheckout,
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
    path: '/:any(.*)', // .*
    component: AppE404,
  },
];

export default createRouter({
	routes,
	history: createWebHistory()
});
