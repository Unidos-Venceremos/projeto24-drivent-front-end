import api from './api';

export async function getAvailableBedrooms(token) {
  const response = await api.get('/bedrooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
