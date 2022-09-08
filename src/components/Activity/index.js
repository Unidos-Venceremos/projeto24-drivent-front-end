import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TicketContext from '../../contexts/TicketContext';
import useTicketByUserId from '../../hooks/api/useTicketbyId.js';

export default function ActivityTab() {
  const [freeToChoose, setFreeToChoose] = useState(false);

  const { selectTicket } = useContext(TicketContext);
  const { ticket } = useTicketByUserId();

  useEffect(() => {
    if (ticket) {
      setFreeToChoose(true);
    }
  }, [ticket]);

  return (
    <>
      <Title>Escolha de atividades</Title>

      {!freeToChoose ? (
        <SubTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</SubTitle>
      ) : selectTicket.online ? (
        <SubTitle>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</SubTitle>
      ) : (
          <SubTitle>FALTA IMPLEMENTAR</SubTitle>
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
