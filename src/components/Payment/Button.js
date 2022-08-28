import styled from 'styled-components';

export default function Button({ variant = 'contained', children, ...props }) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 145px;
  height: 145px;
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
