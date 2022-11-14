import { useState } from 'react';
import formatPhone from '../utils/formatPhone';
import isEmailValid from '../utils/isEmailValid';
import useErros from './useErrors';

export default function UseForms({
  contactName, contactEmail, contactPhone,
}) {
  const [name, setName] = useState(contactName);
  const [email, setEmail] = useState(contactEmail);
  const [phone, setPhone] = useState(contactPhone);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErros();

  function clearFields() {
    setName('');
    setEmail('');
    setPhone('');
  }

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

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  return {
    errors,
    name,
    email,
    phone,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    clearFields,
  };
}
