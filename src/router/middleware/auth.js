export default function auth({ next, store }) {
  if (!store.getters['user/isLogin']) {
    return next({
      name: 'signin',
    });
  }

  return next();
}
