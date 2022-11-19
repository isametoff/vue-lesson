export default function guest({ next, store }) {
  if (!store.getters['user/isLogin']) {
    return next({
      name: 'catalog',
    });
  }

  return next();
}
