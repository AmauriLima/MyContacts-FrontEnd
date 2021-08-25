import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

export default function EditContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  function setAllStates(contact) {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setCategory(contact.category_id || '');
    setLoading(false);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/contacts/${id}`)
      .then(async (response) => {
        const contact = await response.json();
        setAllStates(contact);
      });
  }, [name]);

  return (
    <>
      <PageHeader
        title={`Editar ${name}`}
      />

      {loading
        ? <Loader />
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
