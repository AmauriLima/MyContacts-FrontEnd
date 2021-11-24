import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import formatPhone from '../../utils/formatPhone';
import ContactsService from '../../services/ContactsService';

export default function EditContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  function setAllStates(contact) {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(formatPhone(contact.phone));
    setCategory(contact.category_id || '');
  }

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);
        const contact = await ContactsService.getContact(id);
        setAllStates(contact);
      } catch (error) {
        // console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContact();
  }, [id]);

  return (
    <>
      <PageHeader
        title={`Editar ${name}`}
      />

      {isLoading
        ? <Loader isLoading={isLoading} />
        : (
          <ContactForm
            buttonLabel="Salvar alterações"
            contactName={name}
            contactEmail={email}
            contactPhone={phone}
            contactCategory={category}
          />
        )}
    </>
  );
}
