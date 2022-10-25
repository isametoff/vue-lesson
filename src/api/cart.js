import http from '@/api/http';

export async function load(token) {
  let { data } = await http.post('cart', { oldToken: token });
  return data;
}

export async function add(token, id) {
  let { data } = await http.post(
    `cart/add`,
    { oldToken: token, id: id },
    {
      errorAlert: 'при добавлении товара',
      fixed: false,
    }
  );
  return data.addToData;
}

export async function remove(token, id, rootGetters) {
  let { data } = await http.post(
    `cart/remove`,
    { oldToken: token, id: id },
    {
      errorAlert: 'при удалении товара',
      fixed: false,
    }
  );
  return data;
}

export async function count(token, id, cnt) {
  let { data } = await http.post(
    `cart/count`,
    { oldToken: token, id: id, cnt: cnt },
    {
      errorAlert: 'при изменении количества товара',
      fixed: false,
    }
  );
  return data.setData;
}
