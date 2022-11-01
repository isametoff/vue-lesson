import http from '@/api/http';

export async function auth({ login, password, isAuth }) {
  let { data } = await http.post('auth', {
    login: login,
    password: password,
    isAuth: isAuth,
  });
  
  return data;
}
