import { createContext, useState } from 'react';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const [selectTicket, setSelectTicket] = useState({ presential: false, online: false });
  const [selectHosting, setSelectHosting] = useState({ withoutHotel: false, withHotel: false });
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);

  return (
    <TicketContext.Provider
      value={{
        selectTicket,
        setSelectTicket,
        selectHosting,
        setSelectHosting,
        showPaymentConfirm,
        setShowPaymentConfirm,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
