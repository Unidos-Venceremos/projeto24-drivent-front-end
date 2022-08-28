import styled from 'styled-components';

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

  return (
    <>
      <SubTitle>Ingresso escolhido</SubTitle>
      <Button onClick={null} selected={true} disabled={true}>
        <h1>{generateText()}</h1>
        <Spacer height={8} />
        <h2>{generateValue()}</h2>
      </Button>
    </>
  );
}

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

const Spacer = styled.div`
  height: ${(props) => props.height || '0'}px;
`;
