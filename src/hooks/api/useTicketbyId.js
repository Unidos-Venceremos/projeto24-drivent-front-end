import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketByUserId() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicketById,
  } = useAsync(() => ticketApi.getTicketbyUserId(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicketById,
  };
}
