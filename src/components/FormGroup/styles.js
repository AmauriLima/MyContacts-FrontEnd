import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ groupType }) => groupType === 'select' && css`
    display: grid;
  `}

  & + & {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }
`;
