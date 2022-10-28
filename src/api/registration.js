import http from '@/api/http';

export async function registration(
  email,
  login,
  password,
  password_confirmation
) {
  let { data } = await http.post('registration', {
    email,
    login,
    password,
    password_confirmation,
  });
  console.log("🚀 ~ file: auth.js ~ line 15 ~ data", data)

  
  return data;
}
