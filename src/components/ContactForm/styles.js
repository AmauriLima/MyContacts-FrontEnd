import styled from 'styled-components';

import Arrow from '../../assets/images/icons/arrow.svg';

export const Form = styled.form`

`;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;

export const ArrowDown = styled.span`
  display: flex;
  width: 16px;
  height: 16px;
  background: url(${Arrow}) no-repeat top center;
  background-size: cover;

  grid-column: 1 / 2;
  grid-row: 1 / 2;

  flex-direction: column;
  justify-self: flex-end;
  align-self: center;

  margin-right: 16px;

  transform: rotate(180deg);

`;
