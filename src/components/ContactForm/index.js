import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer, ArrowDown } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({
  buttonLabel, contactName, contactEmail, contactPhone, contactCategory,
}) {
  const [name, setName] = useState(contactName);
  const [email, setEmail] = useState(contactEmail);
  const [phone, setPhone] = useState(contactPhone);
  const [category, setCategory] = useState(contactCategory);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(async (response) => {
        const json = await response.json();
        setCategories(json);
      });
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }
  function handleSubmit(event) {
    event.preventDefault();

    const { endpoint, method } = id
      ? { endpoint: `contacts/${id}`, method: 'PUT' }
      : { endpoint: 'contacts', method: 'POST' };

    const body = JSON.stringify({
      name,
      email,
      phone,
      category_id: category || null,
    });

    fetch(`http://localhost:3001/${endpoint}`, {
      method,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body,
    });
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup groupType="select">
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          {categories.map((categoryItem) => (
            <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>
          ))}
        </Select>
        <ArrowDown />
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  contactName: PropTypes.string,
  contactEmail: PropTypes.string,
  contactPhone: PropTypes.string,
  contactCategory: PropTypes.string,
};

ContactForm.defaultProps = {
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactCategory: '',
};
