import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(contactId) {
    return this.httpClient.get(`/contacts/${contactId}`);
  }

  createContact({ body }) {
    return this.httpClient.post('/contacts', { body });
  }

  updateContact({ body, id }) {
    return this.httpClient.put({ path: `/contacts/${id}`, body });
  }
}

export default new ContactsService();
