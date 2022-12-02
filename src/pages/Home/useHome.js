/* eslint-disable react/jsx-one-expression-per-line */
import {
  useEffect, useState, useCallback, useMemo, useDeferredValue,
} from 'react';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setisLoadingDelete] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    (contact.name.toLowerCase()).includes(deferredSearchTerm.toLowerCase())
  )), [deferredSearchTerm, contacts]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }, []);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setisLoadingDelete(true);
      await ContactsService.deleteContact({ id: contactBeingDeleted.id });

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });

      handleCloseDeleteModal();
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setisLoadingDelete(false);
    }
  }

  return {
    isLoading,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
