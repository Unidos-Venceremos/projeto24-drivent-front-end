import api from './api';

export async function getAvailableDaysOfActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
