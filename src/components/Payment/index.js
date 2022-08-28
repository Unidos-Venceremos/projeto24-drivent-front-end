import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

import useTicket from '../../hooks/api/useTicket';
import useBedroom from '../../hooks/api/useBedroom';
import GreyButton from './GreyButton';

const PRESENTIAL = 'presential';
const ONLINE = 'online';
const WITHOUT_HOTEL = 'withoutHotel';
const WITH_HOTEL = 'withHotel';

export default function PaymentTab() {
  const { ticket } = useTicket();
  const { bedroom } = useBedroom();

  const [availableTickets, setAvailableTickets] = useState({ presential: 0, online: 0 });
  const [selectTicket, setSelectTicket] = useState({ presential: false, online: false });
  const [selectHosting, setSelectHosting] = useState({ withoutHotel: false, withHotel: false });

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

  return (
    <>
      <Title>Ingresso e pagamento</Title>
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
          <Spacer height={20} />
          <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
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

      {selectTicket.online ?
        <>
          <Spacer height={44} />
          <SubTitle>Fechado! O total ficou em <strong>R$ 100</strong>. Agora é só confirmar:</SubTitle>
          <GreyButton onClick={() => console.log('selectTicket: ', selectTicket)}>RESERVAR INGRESSO</GreyButton>
        </>
        :
        <></>
      }

      {selectTicket.presential && (selectHosting.withHotel || selectHosting.withoutHotel) ?
        <>
          <Spacer height={44} />
          <SubTitle>Fechado! O total ficou em
            {selectHosting.withHotel ? <strong>R$ 600</strong> : <strong>R$ 250</strong>}
            . Agora é só confirmar:</SubTitle>
          <GreyButton onClick={() => console.log('selectHosting: ', selectHosting)}>RESERVAR INGRESSO</GreyButton>
        </>
        :
        <></>
      }
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
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 17px;

  color: #8e8e8e;
`;

const Spacer = styled.div`
  height: ${(props) => props.height || '0'}px;
`;
