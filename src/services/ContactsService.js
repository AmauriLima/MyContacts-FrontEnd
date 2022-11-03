import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContact(contactId) {
    return this.httpClient.get(`/contacts/${contactId}`);
  }

  async createContact({ body }) {
    return this.httpClient.post('/contacts', { body });
  }

  async updateContact({ body, id }) {
    return this.httpClient.put({ path: `/contacts/${id}`, body });
  }
}

export default new ContactsService();
