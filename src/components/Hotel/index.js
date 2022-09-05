import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

import TicketContext from '../../contexts/TicketContext';
import useTicketByUserId from '../../hooks/api/useTicketbyId.js';

import useHotel from '../../hooks/api/useHotel.js';
import useHotelBedroom from '../../hooks/api/useHotelBedroom.js';

import { formatAccomodation } from '../../utils/formatters.js';
import GreyButton from '../Payment/GreyButton.js';

export default function HotelTab() {
  const [hotels, setHotels] = useState([]);
  const [showBedrooms, setShowBedrooms] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [showHotels, setShowHotels] = useState(false);

  const { selectTicket, selectHosting } = useContext(TicketContext);
  const { hotel } = useHotel();
  const { getHotelBedrooms, hotelBedrooms } = useHotelBedroom();
  const { ticket } = useTicketByUserId();

  useEffect(() => {
    if (ticket) {
      setShowBedrooms(true);
    }
  }, [ticket]);

  useEffect(() => {
    if (hotel) {
      setHotels(hotel);
    }
  }, [hotel]);

  useEffect(() => {
    if (selectedHotel) {
      // eslint-disable-next-line space-before-function-paren
      (async () => {
        await getHotelBedrooms(selectedHotel);
      })();
    }
  }, [selectedHotel]);

  const handleSelectHotel = (id) => {
    setSelectedBedroom(null);

    if (id === selectedHotel) {
      setSelectedHotel(null);
      return;
    }

    setSelectedHotel(id);
  };

  const handleSelectBedroom = (id) => {
    if (id === selectedBedroom) {
      setSelectedBedroom(null);

      return;
    }

    setSelectedBedroom(id);
  };

  const generateVacancies = (occupped, totalCapacity, select) => {
    if (select) {
      totalCapacity[totalCapacity.length - 1] = 1;
    } else {
      totalCapacity[totalCapacity.length - 1] = 0;
    }

    return (
      <IconsContainer>
        {totalCapacity.map((value, index) => {
          if (value === 1) {
            return <BsPersonFill key={index} size="25px" fill="#FF4791" />;
          }

          return <BsPerson key={index} size="25px" fill="#333" />;
        })}
        {occupped.map((_, index) => (
          <BsPersonFill fill="black" key={index} size="25px" />
        ))}
      </IconsContainer>
    );
  };

  const handleBookRoom = (e) => {
    e.preventDefault();
    // console.log(selectedHotel);
    // console.log(selectedBedroom);
  };

  useEffect(() => {
    const hasPayment = ticket?.Payment;

    if (hasPayment) {
      setShowHotels(true);
    }
  }, [ticket]);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>

      {!showBedrooms ? (
        <SubTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</SubTitle>
      ) : selectTicket.online || selectHosting.withoutHotel ? (
        <SubTitle>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</SubTitle>
      ) : (
        showHotels ? (
          <>
            <SubTitleInfo>Primeiro, escolha seu hotel</SubTitleInfo>
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                onClick={() => handleSelectHotel(hotel.id)}
                selected={selectedHotel === hotel.id}
                disabled={!hotel?.vacancies}
              >
                <HotelImage src={hotel?.backgroundImageUrl} />
                <HotelName>{hotel?.name}</HotelName>
                <HotelDescription>
                Tipos de acomodação:
                  <span>{formatAccomodation(hotel?.accomodationTypes)}</span>
                </HotelDescription>
                <HotelDescription>
                Vagas disponíveis: <span>{hotel?.vacancies}</span>
                </HotelDescription>
              </HotelCard>
            ))}

            {selectedHotel && (
              <>
                <Spacer height={44} />
                <SubTitleInfo>Ótima pedida! Agora escolha seu quarto</SubTitleInfo>
                <Spacer height={16} />
                <BedroomContainer>
                  {hotelBedrooms?.map((bedroom) => (
                    <BedroomCard
                      key={bedroom?.id}
                      onClick={() => handleSelectBedroom(bedroom?.id)}
                      selected={selectedBedroom === bedroom?.id}
                      disabled={bedroom?.occupped === bedroom.totalCapacity}
                    >
                      <BedroomInfo>
                        <BedroomNumber>{bedroom.number}</BedroomNumber>
                        <BedroomVacancies>
                          {generateVacancies(bedroom?.occupped, bedroom?.totalCapacity, bedroom?.id === selectedBedroom)}
                        </BedroomVacancies>
                      </BedroomInfo>
                    </BedroomCard>
                  ))}
                </BedroomContainer>

                {selectedBedroom && (
                  <>
                    <Spacer height={44} />
                    <GreyButton onClick={handleBookRoom}>RESERVAR INGRESSO</GreyButton>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <SubTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</SubTitle>
        )
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

const Spacer = styled.div`
  height: ${(props) => props.height || '0'}px;
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

const SubTitleInfo = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: block;
  margin-bottom: 20px;
  margin: 0 auto;
  color: #8e8e8e;
`;

const HotelCard = styled.div`
  width: 100%;
  height: 264px;
  max-width: 196px;
  font-family: 'Roboto', sans-serif;
  color: #343434;
  background: ${(props) => (props.selected ? '#FFEED2' : '#f1f1f1')};
  padding: 16px 14px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const HotelName = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-top: 10px;
`;

const HotelDescription = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  margin-top: 14px;

  display: flex;
  flex-direction: column;

  span {
    display: inline-block;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 2px;
  }
`;

const HotelImage = styled.img`
  width: 100%;
  height: 109px;
  border-radius: 5px;
`;

const BedroomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 17px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BedroomCard = styled.div`
  width: 100%;
  min-width: 200px;
  height: 45px;
  background: ${(props) => (props.selected ? '#FFEED2' : '#f1f1f1')};
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 11px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    background-color: #e9e9e9;
    border: 1px solid #cecece;
    color: #9d9d9d;

    svg {
      fill: #8c8c8c;
      color: #8c8c8c;
    }
  }
`;

const BedroomInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const BedroomNumber = styled.div``;

const BedroomVacancies = styled.div``;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 27px;
`;
