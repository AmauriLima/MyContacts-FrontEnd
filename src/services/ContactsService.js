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

  async listCategories() {
    return this.httpClient.get('/categories');
  }

  async createContact(endpoint, method, headers, body) {
    this.httpClient.post(endpoint, method, headers, body);
  }
}

export default new ContactsService();
