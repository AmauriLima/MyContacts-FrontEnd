import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  `;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    background-color: #fff;
    height: 50px;
    border-radius: 25px;
    border: none;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    outline: none;

    padding: 0 16px;

    &::placeholder {
      color: '#BCBCBC';

    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  font-weight: 700;
  margin-top: 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  padding-bottom: 16px;

  strong {
    font-size: 24px;
    color: #222222;
  }

  a {
    padding: 8px 16px;

    text-decoration: none;

    color: ${({ theme }) => theme.colors.primary.main};

    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;

    transition: all 200ms ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

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

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }
  }
`;

export const EmptyListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const SearchNotFoundContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word;
  }
`;
