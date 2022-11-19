import delay from '../utils/delay';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContactById(contactId) {
    await delay(5000);
    return this.httpClient.get(`/contacts/${contactId}`);
  }

  createContact({ body }) {
    return this.httpClient.post('/contacts', { body });
  }

  updateContact({ body, id }) {
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact({ id }) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
