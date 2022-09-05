import useAsync from '../useAsync';
import useToken from '../useToken.js';

import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const { data: hotel, loading: hotelLoading, error: hotelError } = useAsync(() => hotelApi.getHotelsInfo(token));

  return {
    hotel,
    hotelLoading,
    hotelError,
  };
}
