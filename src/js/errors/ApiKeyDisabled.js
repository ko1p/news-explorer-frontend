export default class ApiKeyDisabled extends Error {
  constructor(message) {
    super(message)
    this.name = 'Ваш токен заблокирован'
  }
}