import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  background-color: #fff;
  height: 52px;

  border: 2px solid #AAAAAA;
  border-radius: 4px;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  padding: 0 16px;
  outline: none;

  font-size: 16px;
  border: 2px solid transparent;

  transition: border-color 200ms ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}


  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
