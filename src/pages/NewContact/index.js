import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit({ body }) {
    try {
      await ContactsService.createContact({ body });

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato.',
      });
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
