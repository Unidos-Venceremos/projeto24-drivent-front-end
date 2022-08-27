import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

import useTicket from '../../hooks/api/useTicket';

export default function PaymentTab() {
  const { ticket } = useTicket();

  const [availableTickets, setAvailableTickets] = useState({ presential: 0, online: 0 });

  useEffect(() => {
    if (ticket) {
      let presentialCount = 0;
      let onlineCount = 0;

      ticket.forEach(element => {
        element.presential ? presentialCount++ : onlineCount++;
      });
      
      setAvailableTickets({ presential: presentialCount, online: onlineCount });
    }
  }, [!ticket]);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <Button 
        onClick={() => console.log('availableTickets: ', availableTickets)} 
        disabled={!availableTickets.presential}
      >
        <h1>Presencial</h1>
        <h2>R$ 250</h2>
      </Button>
      <Button 
        onClick={() => console.log('availableTickets: ', availableTickets)} 
        disabled={!availableTickets.online}
      >
        <h1>Online</h1>
        <h2>R$ 100</h2>
      </Button>
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

  color: #8E8E8E;
`;
