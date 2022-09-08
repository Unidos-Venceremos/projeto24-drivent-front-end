import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import useActivity from '../../hooks/api/useActivities.js';
import TicketContext from '../../contexts/TicketContext';
import useTicketByUserId from '../../hooks/api/useTicketbyId.js';

import { formatActivitiesDate } from '../../utils/formatters.js';

export default function ActivityTab(props) {
  const [freeToChoose, setFreeToChoose] = useState(false);
  const [activitiesDate, setActivitiesDate] = useState([]);
  const [selectActivitiesDate, setSelectActivitiesDate] = useState(null);

  const { activitiesDays } = useActivity();
  const { selectTicket } = useContext(TicketContext);
  const { ticket } = useTicketByUserId();
  
  useEffect(() => {
    if (ticket) {
      setFreeToChoose(true);
    }
  }, [ticket]);
  
  useEffect(() => {
    if (activitiesDays) {
      const activitiesDateFormatted = activitiesDays.map(formatActivitiesDate);
      setActivitiesDate(activitiesDateFormatted);
    }
  }, [activitiesDays]);

  const handleSelectActivitiesDate = (date) => {
    if (selectActivitiesDate === date) {
      setSelectActivitiesDate(null);
      return;
    }

    setSelectActivitiesDate(date);
  }

  return (
     <>
      <Title>Escolha de atividades</Title>
        {!freeToChoose ? (
          <SubTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</SubTitle>
        ) : selectTicket.online ? (
          <SubTitle>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
          </SubTitle>
        ) : (
          <>
            <SubTitle2>Primeiro, filtre pelo dia do evento: </SubTitle2>
            <Spacer height={10} />
            {activitiesDate?.map((day, index) => {
              return (
                <StyledButton
                  onClick={() => handleSelectActivitiesDate(day)}
                  key={day + index}
                  selected={selectActivitiesDate === day}
                >
                  {day}
                </StyledButton>
              );
            })}
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

const SubTitle2 = styled.h2`
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

const StyledButton = styled.button`
  width: 162px;
  height: 37px;
  margin-right: 17px;
  margin-bottom: 17px;

  background: ${(props) => (props.selected ? '#FFD37D' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
