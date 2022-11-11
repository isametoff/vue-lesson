import http from '@/api/http';

export async function order({ token, order }) {
  console.log('🚀 ~ file: order.js ~ line 4 ~ order ~ order{ token, order }', {
    token,
    order,
  });
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  let { data } = await http.post('order', { order }, config);
  console.log('🚀 ~ file: order.js ~ line 12 ~ order ~ { data }', { data });

  return data;
}
export async function load({ tokenPay, token }) {
  console.log(
    '🚀 ~ file: order.js ~ line 21 ~ load ~ load({ tokenPay, token})',
    { tokenPay, token }
  );
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  let { data } = await http.post('order/load', { tokenPay }, config);
  console.log('🚀 ~ file: order.js ~ line 12 ~ order ~ { data }', { data });

  return data;
}
