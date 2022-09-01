import { useState } from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components';

import { formatCreditCardNumber, formatName, formatCVC, formatExpirationDate } from '../../utils/formatters.js';

export default function CreditCardContainer(props) {
  const [creditCard, setCreditCard] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    focused: '',
  });

  const handleInputFocus = ({ target }) => {
    setCreditCard({ ...creditCard, focused: target.name });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    } else if (target.name === 'name') {
      target.value = formatName(target.value);
    }

    setCreditCard({ ...creditCard, [target.name]: target.value });
  };

  return (
    <CardContainer>
      <Cards
        cvc={creditCard.cvc}
        expiry={creditCard.expiry}
        name={creditCard.name}
        number={creditCard.number}
        focused={creditCard.focused}
      />

      <FormContainer>
        <Input
          type="tel"
          name="number"
          placeholder="Card Number"
          pattern="[\d| ]{16,19}"
          maxLength={19}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <Small>E.g.: 49..., 51..., 36..., 37...</Small>
        <Input
          type="tel"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={30}
          required
        />

        <ColumnContainer>
          <Input
            type="tel"
            name="expiry"
            placeholder="Expiration Date"
            onChange={handleInputChange}
            width="180%"
            required
          />
          <Spacer width="30px" />
          <Input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </ColumnContainer>
      </FormContainer>
    </CardContainer>
  );
}

const CardContainer = styled.section`
  display: flex;
  max-width: 80%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px 20px;
`;

const ColumnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '10px'};
`;

const Small = styled.small`
  font-size: 14px;
  align-self: flex-start;
  color: #999;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 40px;
  border: 2px solid #cecece;
  padding: 20px 10px;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  margin-right: ${(props) => (props.width === '100%' ? props.width : '0')};

  &:focus {
    border: 2px solid #333;
  }

  &:placeholder-shown {
    color: gray;
  }
`;
