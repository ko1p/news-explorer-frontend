export default class MainApi {
  constructor(url) {
    this.url = url;
  }

  signup(data) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        authorization: localStorage.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
  }

  signin(data) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
  }

  getUserData(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    });
  }

  createArticle(data) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: data.keyword,
        title: data.title,
        text: data.text,
        date: data.date,
        source: data.source,
        link: data.link,
        image: data.image,
      }),
    });
  }

  removeArticle(articleId) {
    return fetch(`${this.url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
