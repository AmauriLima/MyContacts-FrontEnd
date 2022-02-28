import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import UseForms from '../../hooks/useForms';
import ContactsService from '../../services/ContactsService';
import CategoriesService from '../../services/CategoriesService';

export default function ContactForm({
  buttonLabel, contactName, contactEmail, contactPhone, contactCategory,
}) {
  const [category, setCategory] = useState(contactCategory);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

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
        const response = await CategoriesService.listCategories();
        setCategories(response);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }
    listCategories();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const method = id
      ? 'PUT'
      : 'POST';

    const body = {
      name,
      email,
      phone,
      category_id: category || null,
    };

    if (method === 'POST') {
      ContactsService.createContact({ body });
      return;
    }
    if (method === 'PUT') {
      ContactsService.updateContact({ body, id });
    }
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

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Categoria</option>
          {categories.map((categoryItem) => (
            <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>
          ))}
        </Select>
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
