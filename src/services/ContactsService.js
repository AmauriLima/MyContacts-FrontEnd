import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(contactId) {
    const contact = await this.httpClient.get(`/contacts/${contactId}`);

    return ContactMapper.toDomain(contact);
  }

  createContact({ body }) {
    const contact = ContactMapper.toPersistence(body);
    return this.httpClient.post('/contacts', { body: contact });
  }

  updateContact({ body, id }) {
    const contact = ContactMapper.toPersistence(body);
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }

  deleteContact({ id }) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
