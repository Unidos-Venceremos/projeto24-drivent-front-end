import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bedroomApi from '../../services/bedroomApi';

export default function useHotelBedroom() {
  const token = useToken();

  const {
    data: hotelBedrooms,
    loading: hotelBedroomsLoading,
    error: hotelBedroomsError,
    act: getHotelBedrooms,
  } = useAsync((hotelId) => bedroomApi.getAvailableBedroomsByHotelId(token, hotelId), false);

  return {
    hotelBedrooms,
    hotelBedroomsLoading,
    hotelBedroomsError,
    getHotelBedrooms,
  };
}
