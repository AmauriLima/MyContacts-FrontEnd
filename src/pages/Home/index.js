import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import formatPhone from '../../utils/formatPhone';

import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';

import Loader from '../../components/Loader';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
        setLoading(false);
      });
  }, []);

  function handleOrder() {
    setOrder(order === 'asc' ? 'desc' : 'asc');

    setLoading(true);
    fetch(`http://localhost:3001/contacts?orderBy=${order}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
        setLoading(false);
      });
  }

  return (
    <Container>
      {loading && (<Loader />) }
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button" onClick={handleOrder}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" className={order} />
          </button>
        </header>
      </ListContainer>

      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
                <small>{contact.category_name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
