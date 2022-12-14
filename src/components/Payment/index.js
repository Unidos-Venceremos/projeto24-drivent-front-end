import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import Button from './Button';

import useTicket from '../../hooks/api/useTicket.js';
import useBedroom from '../../hooks/api/useBedroom.js';
import GreyButton from './GreyButton.js';
import BookTicket from './BookTicket.js';
import useEnrollment from '../../hooks/api/useEnrollment.js';
import usePayment from '../../hooks/api/usePayment.js';
import useTicketByUserId from '../../hooks/api/useTicketbyId.js';
import TicketContext from '../../contexts/TicketContext';

const PRESENTIAL = 'presential';
const ONLINE = 'online';
const WITHOUT_HOTEL = 'withoutHotel';
const WITH_HOTEL = 'withHotel';

export default function PaymentTab() {
  const { selectTicket, setSelectTicket, selectHosting, setSelectHosting, showPaymentConfirm, setShowPaymentConfirm } =
    useContext(TicketContext);
  const { Payment, paymentLoading } = usePayment();
  const { ticket: ticketById } = useTicketByUserId();
  const { ticket } = useTicket();
  const { bedroom } = useBedroom();
  const enrollment = useEnrollment().enrollment;

  const [availableTickets, setAvailableTickets] = useState({ presential: 0, online: 0 });
  const [showBookTicket, setShowBookTicket] = useState(false);

  useEffect(() => {
    if (ticketById) {
      setShowBookTicket(true);
      setShowPaymentConfirm(true);
      if (ticketById.presential) {
        setSelectTicket({ presential: true, online: false });
        setSelectHosting({
          withoutHotel: ticketById?.Payment.withHotel || false,
          withHotel: !ticketById?.Payment.withHotel || false,
        });
      } else {
        setSelectTicket({ presential: false, online: true });
        setSelectHosting({ withoutHotel: false, withHotel: false });
      }
    }
  }, [!ticketById]);

  useEffect(() => {
    if (ticket) {
      let presentialCount = 0;
      let onlineCount = 0;

      ticket.forEach((element) => {
        element.presential ? presentialCount++ : onlineCount++;
      });

      setAvailableTickets({ presential: presentialCount, online: onlineCount });
    }
  }, [!ticket]);

  const handleSelectTicket = (ticketType) => {
    const allTypesOfTickets = { presential: false, online: false };
    const allTypesOfHosting = { withoutHotel: false, withHotel: false };

    if (selectTicket[ticketType]) {
      setSelectTicket(allTypesOfTickets);
      setSelectHosting(allTypesOfHosting);
    } else setSelectTicket({ ...allTypesOfTickets, [ticketType]: true });

    if (ticketType === ONLINE) setSelectHosting(allTypesOfHosting);
  };

  const handleSelectHosting = (hostingType) => {
    const allTypesOfHosting = { withoutHotel: false, withHotel: false };

    if (selectHosting[hostingType]) setSelectHosting(allTypesOfHosting);
    else setSelectHosting({ ...allTypesOfHosting, [hostingType]: true });
  };

  const handleBookTicket = () => {
    setShowBookTicket(true);
  };

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      {!enrollment ? (
        <SubTitle>Voc?? precisa completar sua inscri????o antes de prosseguir pra escolha de ingresso</SubTitle>
      ) : showBookTicket ? (
        <BookTicket
          ticket={selectTicket}
          hosting={selectHosting}
          showPaymentConfirm={showPaymentConfirm}
          setShowPaymentConfirm={setShowPaymentConfirm}
          Payment={Payment}
          paymentLoading={paymentLoading}
        />
      ) : (
        <>
          {console.log('ticket', availableTickets)}
          <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
          <Button
            onClick={() => handleSelectTicket(PRESENTIAL)}
            selected={selectTicket.presential}
            disabled={!availableTickets.presential}
          >
            <h1>Presencial</h1>
            <h2>R$ 250</h2>
          </Button>
          <Button
            onClick={() => handleSelectTicket(ONLINE)}
            selected={selectTicket.online}
            disabled={!availableTickets.online}
          >
            <h1>Online</h1>
            <h2>R$ 100</h2>
          </Button>

          {selectTicket && selectTicket?.presential && (
            <>
              <Spacer height={44} />
              <SubTitle>??timo! Agora escolha sua modalidade de hospedagem</SubTitle>
              <Button onClick={() => handleSelectHosting(WITHOUT_HOTEL)} selected={selectHosting.withoutHotel}>
                <h1>Sem Hotel</h1>
                <h2>+ R$ 0</h2>
              </Button>
              {bedroom && bedroom?.length > 0 && (
                <Button onClick={() => handleSelectHosting(WITH_HOTEL)} selected={selectHosting.withHotel}>
                  <h1>Com Hotel</h1>
                  <h2>+ R$ 350</h2>
                </Button>
              )}
            </>
          )}

          {selectTicket.online ? (
            <>
              <Spacer height={44} />
              <SubTitle>
                Fechado! O total ficou em <strong>R$ 100</strong>. Agora ?? s?? confirmar:
              </SubTitle>
              <GreyButton onClick={handleBookTicket}>RESERVAR INGRESSO</GreyButton>
            </>
          ) : (
            <></>
          )}

          {selectTicket.presential && (selectHosting.withHotel || selectHosting.withoutHotel) ? (
            <>
              <Spacer height={44} />
              <SubTitle>
                Fechado! O total ficou em
                {selectHosting.withHotel ? <strong> R$ 600</strong> : <strong> R$ 250</strong>}. Agora ?? s?? confirmar:
              </SubTitle>
              <GreyButton onClick={handleBookTicket}>RESERVAR INGRESSO</GreyButton>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

const Title = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  margin-bottom: 37px;

  color: #000000;
`;

const SubTitle = styled.h2`
  width: 90%;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 17px;
  text-align: left;
  color: #8e8e8e;
`;

const Spacer = styled.div`
  height: ${(props) => props.height || '0'}px;
`;
