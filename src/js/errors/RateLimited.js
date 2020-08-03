export default class RateLimited extends Error {
  constructor(message) {
    super(message)
    this.name = 'Вы делаете слишком много поисковых запросов'
  }
}