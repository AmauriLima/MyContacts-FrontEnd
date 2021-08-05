import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: fit-content;

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }

    span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  h1 {
    margin-top: 8px;
    font-size: 24px;
  }

`;
