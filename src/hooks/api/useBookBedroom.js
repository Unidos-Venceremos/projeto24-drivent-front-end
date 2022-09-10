import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bedroomApi from '../../services/bedroomApi';

export default function useBookBedroom() {
  const token = useToken();

  const {
    data: Bedroom,
    loading: bedroomLoading,
    error: bedroomError,
    act: BookBedrooms,
  } = useAsync((hotelId, bedroomId) => bedroomApi.BookBedrooms(token, hotelId, bedroomId), false);
    
  return {
    Bedroom,
    bedroomLoading,
    bedroomError,
    BookBedrooms,
  };
}
