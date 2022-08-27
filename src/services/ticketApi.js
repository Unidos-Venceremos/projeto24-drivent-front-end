import api from './api';

export async function getAvailableTickets(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data;
}
//
