import api from './api';

export async function getAvailableActivitiesByDate(token, date) {
  const response = await api.get('/activities/filter/?activityDay=' + date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
