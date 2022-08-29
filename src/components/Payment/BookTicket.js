import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';

import CreditCardContainer from './CreditCardContainer.js';

export default function BookTicket(props) {
  const generateText = () => {
    const { presential, online } = props.ticket;
    const { withoutHotel, withHotel } = props.hosting;

    if (presential && withoutHotel) return 'Presencial + Sem Hotel';

    if (presential && withHotel) return 'Presencial + Com Hotel';

    if (online) return 'Online';
  };

  const generateValue = () => {
    const { presential, online } = props.ticket;
    const { withoutHotel, withHotel } = props.hosting;

    if (presential && withoutHotel) return 'R$ 250,00';

    if (presential && withHotel) return 'R$ 600,00';

    if (online) return 'R$ 100,00';
  };

  const handleSubmit = (e) => {
    e.prevendDefault();
  };

  return (
    <>
      <SubTitle>Ingresso escolhido</SubTitle>
      <Button onClick={null} selected={true} disabled={true}>
        <h1>{generateText()}</h1>
        <Spacer height={8} />
        <h2>{generateValue()}</h2>
      </Button>
      <Spacer height={20} />
      <SubTitle>Pagamento</SubTitle>
      <Form onSubmit={handleSubmit}>
        <CreditCardContainer />
        <Spacer height={50} />
        <GreyButton type="submit">FINALIZAR PAGAMENTO</GreyButton>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 17px;

  color: #8e8e8e;
`;

const Button = styled.button`
  width: max-content;
  height: max-content;
  padding: 36px 62px;
  margin-right: 24px;

  border: ${(props) => (props.selected ? '1px solid #FFEED2' : '1px solid #cecece')};
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFFFFF')};
  cursor: pointer;

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #454545;
  }
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;
  }
`;

const GreyButton = styled.button`
  width: max-content;
  height: 37px;
  padding: 10px 20px;

  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const Spacer = styled.div`
  height: ${(props) => props.height || '0'}px;
`;
