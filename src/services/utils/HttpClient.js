import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    await delay(500);
    return response.json();
  }

  post(path, method, headers, body) {
    fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body,
    });
  }
}

export default HttpClient;
