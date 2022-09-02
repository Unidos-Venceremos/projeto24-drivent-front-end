import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();

  const {
    loading: paymentLoading,
    error: paymentError,
    act: Payment,
  } = useAsync((data) => paymentApi.Payment(token, data), false);

  return {
    Payment,
    paymentLoading,
    paymentError,
  };
}
