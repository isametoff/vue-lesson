import http from '@/api/http';

export async function auth(
  login,
  password,
) {
  let { data } = await http.post('auth', {
    login,
    password,
  });
  
  return data;
}
