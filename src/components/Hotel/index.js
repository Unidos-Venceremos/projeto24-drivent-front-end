import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TicketContext from '../../contexts/TicketContext';
import useTicketByUserId from '../../hooks/api/useTicketbyId.js';

export default function HotelTab() {
  const [showHotels, setShowHotels] = useState(false);

  const { ticket } = useTicketByUserId();
  const { selectTicket, selectHosting } = useContext(TicketContext);

  useEffect(() => {
    const hasPayment = ticket?.payment;

    if (hasPayment) {
      setShowHotels(true);
    }
  }, [ticket]);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {selectTicket.online || selectHosting.withoutHotel ? (
        <SubTitle>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</SubTitle>
      ) : (
        <>
          {showHotels ? (
            <></>
          ) : (
            <SubTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</SubTitle>
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
  height: 70%;
  width: 60%;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  color: #8e8e8e;
`;
