import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form, ButtonContainer, ArrowDown } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import ContactsService from '../../services/ContactsService';
import UseForms from '../../hooks/useForms';

export default function ContactForm({
  buttonLabel, contactName, contactEmail, contactPhone, contactCategory,
}) {
  const [category, setCategory] = useState(contactCategory);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const {
    errors,
    name,
    email,
    phone,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
  } = UseForms({ contactName, contactEmail, contactPhone });

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function listCategories() {
      try {
        const response = await ContactsService.listCategories();
        setCategories(response);
      } catch (error) {
        console.log('error', error);
      }
    }
    listCategories();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const { endpoint, method } = id
      ? { endpoint: `/contacts/${id}`, method: 'PUT' }
      : { endpoint: '/contacts', method: 'POST' };

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      name,
      email,
      phone,
      category_id: category || null,
    });

    ContactsService.createContact({
      path: endpoint, method, headers, body,
    });
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
