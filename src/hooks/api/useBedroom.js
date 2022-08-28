import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bedroomApi from '../../services/bedroomApi';

export default function useBedroom() {
  const token = useToken();

  const {
    data: bedroom,
    loading: bedroomLoading,
    error: bedroomError,
    act: getBedrooms,
  } = useAsync(() => bedroomApi.getAvailableBedrooms(token));

  return {
    bedroom,
    bedroomLoading,
    bedroomError,
    getBedrooms,
  };
}
