/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { MdExitToApp } from 'react-icons/md';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import useActivity from '../../hooks/api/useActivities.js';
import TicketContext from '../../contexts/TicketContext';
import useTicketByUserId from '../../hooks/api/useTicketbyId.js';
import useActivitiesByDate from '../../hooks/api/useActivitiesByDate.js';
import useUserActivities from '../../hooks/api/useUserActivities.js';

import { formatActivitiesDate, formatActivitiesTime } from '../../utils/formatters.js';

export default function ActivityTab(props) {
  const [freeToChoose, setFreeToChoose] = useState(false);
  const [activitiesDate, setActivitiesDate] = useState([]);
  const [selectActivitiesDate, setSelectActivitiesDate] = useState(null);
  const [locals, setLocals] = useState([]);
  const [initialsLocals, setInitialsLocals] = useState([]);
  const [block, setBlock] = useState(false);

  const { selectTicket } = useContext(TicketContext);
  const { activitiesDays } = useActivity();
  const { ticket } = useTicketByUserId();
  const { activitiesByDate, getActivitiesByDate } = useActivitiesByDate();
  const { postUserActivities } = useUserActivities();
  
  useEffect(() => {
    if (ticket) {
      setFreeToChoose(true);
    }
  }, [ticket]);
  
  useEffect(() => {
    if (activitiesDays) {
      setActivitiesDate(activitiesDays);
    }
  }, [activitiesDays]);

  useEffect(() => {
    if (activitiesByDate && !initialsLocals.length) {
      if (!locals.length) {
        const localsInObject = Object.keys(activitiesByDate);

        setLocals(localsInObject);
        setInitialsLocals(localsInObject);
      }
    } else {
      setLocals(initialsLocals);
    }
  }, [activitiesByDate]);

  const handleSelectActivitiesDate = async (date) => {
    if (selectActivitiesDate === date) {
      setSelectActivitiesDate(null);
      setLocals([]);
      return;
    }

    setSelectActivitiesDate(date);

    await getActivitiesByDate(date);
  };

  const handleSelectActivity = async (activity) => {
    try {
      setBlock(true);

      await postUserActivities(activity.id);
      await getActivitiesByDate(selectActivitiesDate);

      setBlock(false);
    } catch (e) {
      toast(e.response.data.message);
      setBlock(false);
    }
  };

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
                  key={String(day + index)}
                  selected={selectActivitiesDate === day}
                >
                  {formatActivitiesDate(day)}
                </StyledButton>
              );
            })}
            {activitiesByDate && (
              <>
                <Spacer height={40} />
                <TrailContainer>
                  {locals && locals.map((local, index) => (
                    <Trail key={String(local + index)}>
                      <TrailTitle>{local}</TrailTitle>
                      <TrailContent>
                        {activitiesByDate[local]?.map((activity, index) => (
                          <TrailItem 
                            key={index} 
                            duration={activity.duration || 1} 
                            selected={activity?.isParticipant}
                            disabled={activity?.isParticipant || activity?.currentVacancies === 0 || block}
                          >
                            <TrailInfoContainer>
                              <TrailItemTitle>{activity.title}</TrailItemTitle>
                              <TrailItemSubtitle>{formatActivitiesTime(activity.startsAt)} - {formatActivitiesTime(activity.endsAt)}</TrailItemSubtitle>
                            </TrailInfoContainer>
                            <TrailItemButton 
                              vacancies={activity?.currentVacancies}
                              disabled={activity?.isParticipant || activity?.currentVacancies === 0 || block}
                              isParticipant={activity?.isParticipant}
                              onClick={activity?.currentVacancies > 0 || activity?.isParticipant || activity?.isParticipant || !block
                                        ? () => handleSelectActivity(activity) 
                                        : null}
                                >
                              {activity?.isParticipant ? (
                                <>
                                  <AiOutlineCheckCircle color="#078632" /> 
                                  <h2>
                                    Inscrito
                                  </h2>
                                </>
                              ) : (
                                activity?.currentVacancies > 0 && !activity?.isParticipant ? (
                                <>
                                  <MdExitToApp color="#078632" /> 
                                  <h2>
                                    {activity?.currentVacancies > 1 ? activity?.currentVacancies + ' Vagas' : activity?.currentVacancies + ' Vaga'}
                                  </h2>
                                </>
                                ) : (
                                  <>
                                    <AiOutlineCloseCircle color="#CC6666"/> <h2>Esgotado</h2>
                                  </>
                                ))}
                            </TrailItemButton>
                          </TrailItem>
                        ))}
                      </TrailContent>
                    </Trail>
                  ))}
                </TrailContainer>
              </>)}
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

const TrailContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Trail = styled.div`
  width: 100%;
  height: 10%;
`;

const TrailTitle = styled.h3`
  font-style: normal;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  margin: 13px 0;

  text-align: center;

  color: #7B7B7B;  
`;

const TrailContent = styled.div`
  width: 100%;
  height: 392px;
  padding: 10px 9px;

  overflow-y: auto;

  border: 1px solid #D7D7D7;
`;

const TrailItem = styled.div`
  width: 100%;
  min-width: 220px;
  height: ${(props) => (props.duration === 1 ? 80 : props.duration * 85)}px;
  padding: 12px 10px;
  padding-right: 2px;
  background-color: ${(props) => (props.selected ? '#D0FFDB' : '#F1F1F1')};
  margin-top: 10px;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;

  button {
    background-color: ${(props) => (props.selected ? '#D0FFDB' : '#F1F1F1')};
  }

  &:disabled {
    pointer-events: none;
  }
`;

const TrailInfoContainer = styled.div`
  width: 80%;
  height: 100%;
  padding-right: 10px;
  border-right: 1px solid #CFCFCF;
`;

const TrailItemTitle = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #343434;
`;

const TrailItemSubtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-right: 10px;
  margin-top: 6px;
  color: #343434;
`;

const TrailItemButton = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  cursor: ${props => props.vacancies > 0 ? 'pointer' : 'not-allowed'};
  
  h2 {
    font-size: 9px; 
    color: ${(props) => (props.vacancies > 0 || props.isParticipant ? '#078632' : '#CC6666')};
  }

  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 4px;
  }

  &:disabled {
    pointer-events: none;
  }
`;
