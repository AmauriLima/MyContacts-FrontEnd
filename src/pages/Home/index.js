/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import formatPhone from '../../utils/formatPhone';

import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from './styles';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/emptyBox.svg';
import magnifierQuestion from '../../assets/images/magnifierQuestion.svg';

import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    (contact.name.toLowerCase()).includes(searchTerm.toLowerCase())
  )), [searchTerm, contacts]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {!!contacts.length && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header justifyContent={
        // eslint-disable-next-line no-nested-ternary
        hasError
          ? 'flex-end'
          : (
            contacts.length
              ? 'space-between'
              : 'center'
          )
      }
      >
        {(!hasError && !!contacts.length) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad face" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(!contacts.length && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                Voc?? ainda n??o tem nenhum contato cadastrado!
                Clique no bot??o <strong>???Novo contato???</strong> ?? cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {filteredContacts.length !== 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="magnifierQuestion" />
              <span>
                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.map((contact) => (
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
        </>
      )}

    </Container>
  );
}
