import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(500);
    const response = await fetch(`${this.baseUrl}${path}`);

    const contentType = response.headers.get('Content-Type');

    let body = null;
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    // Optional chaining
    throw new APIError(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }

  post({
    path, method, headers, body,
  }) {
    fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body,
    });
  }
}

export default HttpClient;
