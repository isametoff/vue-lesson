import http from '@/api/http';

export async function registration({
  email,
  login,
  password,
  password_confirmation,
  register,
}) {
  let { data } = await http.post('registration', {
    email,
    login,
    password,
    password_confirmation,
    register,
  });

  return data;
}
