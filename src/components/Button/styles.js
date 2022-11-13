import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 52px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  padding: 0 16px;

  border: none;
  border-radius: 4px;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  outline: none;

  font-size: 16px;
  font-weight: 700;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background 200ms ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #CCC;
    cursor: not-allowed;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
