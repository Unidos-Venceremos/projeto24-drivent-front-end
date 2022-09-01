import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useUpdateTicket() {
  const token = useToken();

  const {
    loading: ticketLoading,
    error: ticketError,
    act: updateTicket,
  } = useAsync((bool) => ticketApi.UpdateTicket(token, bool), false);

  return {
    updateTicket,
    ticketLoading,
    ticketError,
  };
}
