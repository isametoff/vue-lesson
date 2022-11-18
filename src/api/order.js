import http from '@/api/http';

export async function order({ token, order }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  let { data } = await http.post('order', { order }, config);

  return data;
}
export async function repeat({ token, orderId }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  let { data } = await http.post('order/repeat', { orderId }, config);

  return data;
}
export async function deleteOrder({ token, orderId }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  let { data } = await http.post('order/delete', { orderId }, config);

  return data;
}
export async function load({ orderId, token }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };
  let { data } = await http.post('order/load', { orderId }, config);

  return data;
}
export async function loadAll({ token }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  let { data } = await http.post('order/all-load', '', config);

  return data;
}
