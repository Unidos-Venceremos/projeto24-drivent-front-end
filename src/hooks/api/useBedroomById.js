import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bedroomApi from '../../services/bedroomApi';

export default function usegetBedroomById() {
  const token = useToken();

  const {
    data: bedroom,
    loading: bedroomLoading,
    error: bedroomError,
    act: getBedroomById,
  } = useAsync((hotelId, bedroomId) => bedroomApi.getBedroomById(token, hotelId, bedroomId), false);
    
  return {
    bedroom,
    bedroomLoading,
    bedroomError,
    getBedroomById,
  };
}
