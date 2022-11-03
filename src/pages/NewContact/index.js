import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit({ body }) {
    try {
      const response = await ContactsService.createContact({ body });
      console.log(response);
    } catch {
      alert('Ocorreu um erro ao cadastrar o contato.');
    }
  }

  return (
    <>
      <PageHeader
        title="Novo Contato"
      />

      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </>
  );
}
