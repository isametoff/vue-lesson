import http from '@/api/http';

export async function all() {
  let { data } = await http.get('products', {
    errorAlert: {
      text: 'при получении списка товаров',
      fixed: true,
    },
  });
  let products = data.data.data;
  return products;
}
