import { Link } from 'react-router-dom';

import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Amauri Lima</strong>
            <small>instagram</small>
          </div>
          <span>amauri@devacademy.com.br</span>
          <span>(87) 99999-9999</span>
        </div>

        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="Edit" />
          </Link>
          <button type="button">
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>

    </Container>
  );
}

// fetch('http://localhost:3000')
//   .then((response) => {
//     console.log('response', response);

//     response.headers.forEach((header) => console.log(header));
//   })
//   .catch((error) => {
//     console.log('erro:', error);
//   });
