import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TicketContext from '../../contexts/TicketContext';

import useHotel from '../../hooks/api/useHotel.js';

import { formatAccomodation } from '../../utils/formatters.js';

export default function HotelTab() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const { selectTicket, selectHosting } = useContext(TicketContext);
  const { hotel } = useHotel();

  useEffect(() => {
    if (hotel) {
      setHotels(hotel);
    }
  }, [hotel]);

  useEffect(() => {
    if (selectedHotel) {
      // Fazer request dos quartos disponíveis
    }
  }, [selectedHotel]);

  const handleSelectHotel = (id) => {
    if (id === selectedHotel) {
      setSelectedHotel(null);
      return;
    }

    setSelectedHotel(id);
  };

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {!selectTicket.online && !selectTicket.presential ? (
        <SubTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</SubTitle>
      ) : selectTicket.online || selectHosting.withoutHotel ? (
        <SubTitle>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</SubTitle>
      ) : (
        <>
          <SubTitleInfo>Primeiro, escolha seu hotel</SubTitleInfo>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} onClick={() => handleSelectHotel(hotel.id)} selected={selectedHotel === hotel.id}>
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
            </>
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
