import { useContext } from 'react';
import styled from 'styled-components';

import TicketContext from '../../contexts/TicketContext';

export default function HotelTab() {
  const { selectTicket, selectHosting } = useContext(TicketContext);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {selectTicket.online || selectHosting.withoutHotel ? (
        <SubTitle>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</SubTitle>
      ) : (
        <></>
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
