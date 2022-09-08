import { useState, useEffect } from 'react';
import styled from 'styled-components';

import useActivity from '../../hooks/api/useActivities.js';

import { formatActivitiesDate } from '../../utils/formatters.js';

export default function ActivityTab(props) {
  const [activitiesDate, setActivitiesDate] = useState([]);
  const [selectActivitiesDate, setSelectActivitiesDate] = useState(null);

  const { activitiesDays } = useActivity();

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
  };

  return (
    <>
      <Title>Escolha de atividades</Title>
      <SubTitle>Primeiro, filtre pelo dia do evento: </SubTitle>
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
