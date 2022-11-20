import styled from 'styled-components';

export const ListHeader = styled.header`
  margin-top: 16px;
  margin-bottom: 8px;

  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    img {
      transition: transform .2s ease-in;
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotateX(540deg) rotateY(360deg)' : 'rotate(0deg)')};
    }
  }

  span {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 700;
  }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;

  border-radius: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 16px;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};

        font-weight: 700;
        text-transform: uppercase;

        padding: 4px;
        border-radius: 4px;

        margin-left: 8px;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }
`;
