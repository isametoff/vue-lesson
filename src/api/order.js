import http from '@/api/http';

export async function order({ tokenPay, token, order }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  let { data } = await http.post('order', { order, tokenPay}, config);
  console.log("🚀 ~ file: order.js ~ line 12 ~ order ~ { data }", { data })

  return data;
}


