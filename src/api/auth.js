import http from '@/api/http';

export async function auth({ login, password, isAuth }) {
  let { data } = await http.post(
    'auth',
    { login: login, password: password, isAuth: true },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('🚀 ~ file: auth.js ~ line 4 ~ auth ~ is_auth', {
    login: login,
    password: password,
    isAuth: isAuth,
  });

  return data;
}
