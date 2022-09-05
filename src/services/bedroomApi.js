import api from './api';

export async function getAvailableBedrooms(token) {
  const response = await api.get('/bedrooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getAvailableBedroomsByHotelId(token, hotelId) {
  const response = await api.get('/bedrooms/hotels/' + hotelId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
