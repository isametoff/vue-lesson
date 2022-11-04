import http from '@/api/http';

export async function order({ }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  let { data } = await http.post('order', '', config);

  return data;
}
