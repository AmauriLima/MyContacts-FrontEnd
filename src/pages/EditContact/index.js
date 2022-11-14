import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadContact();
  }, [id]);

  return (
    <>
      <PageHeader
        title="Editar contato"
      />

      {isLoading
        ? <Loader isLoading={isLoading} />
        : (
          <ContactForm
            buttonLabel="Salvar alterações"
          />
        )}
    </>
  );
}
