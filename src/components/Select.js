import styled from 'styled-components';

export default styled.select`
  grid-row: 1 / 2;
  grid-column: 1 / 2;

  width: 100%;
  background-color: #fff;
  height: 52px;

  border: none;
  border-radius: 4px;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  padding: 0 16px;
  outline: none;

  font-size: 16px;
  border: 2px solid transparent;
  appearance: none;

  transition: border-color 200ms ease-in;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
