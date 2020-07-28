import date from '../utils/date';

export default class NewsApi {
  constructor(url, token, apiDays) {
    this.url = url;
    this.authorization = token;
    this.fromDate = date.daysAgo(apiDays);
    this.toDate = date.now();
  }

  getNews(keyWord) {
    return fetch(`${this.url}q=${keyWord}&from=${this.fromDate}&to=${this.toDate}&sortBy=popularity&pageSize=20&apiKey=${this.authorization}`);
  }
}
