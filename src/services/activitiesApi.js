import api from './api';

export async function getAvailableDaysOfActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postUserActivity(token, activityId) {
  const response = await api.post('/activities/create/' + activityId, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
