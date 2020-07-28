export default class ApiKeyInvalid extends Error {
  constructor(message) {
    super(message)
    this.name = 'Неверный токен'
  }
}