import http from '@/api/http';

export async function load(token) {
  let { data } = await http.post('cart', {
    oldToken: token,
    errorAlert: {
      text: 'при получении товаров с корзины',
      fixed: true,
    },
  });
  return data;
}

export async function add(token, id) {
  let { data } = await http.post(
    `cart/add`,
    { oldToken: token, id },
    {
      errorAlert: {
        text: 'при добавлении товара',
        fixed: false,
      },
    }
  );
  return data.data;
}

export async function remove(token, id) {
  let { data } = await http.post(
    `cart/remove`,
    { oldToken: token, id },
    {
      errorAlert: { text: 'при удалении товара', fixed: false },
    }
  );
  return data;
}

export async function count(token, id, cnt) {
  let { data } = await http.post(
    `cart/count`,
    {
      oldToken: token,
      id,
      cnt,
    },
    {
      errorAlert: {
        text: 'при изменении количества товара',
        fixed: false,
      },
    }
  );
  return data.setData;
}
