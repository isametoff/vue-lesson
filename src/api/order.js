import http from '@/api/http';

export async function order({ token, order }) {
  
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };
  let { data } = await http.post('order', order , config);

  return data;
}
