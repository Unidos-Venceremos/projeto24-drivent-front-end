import api from './api';

export async function Payment(token, data) {
  const response = await api.post(
    '/payments',
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
