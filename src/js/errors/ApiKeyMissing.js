export default class ApiKeyMissing extends Error {
  constructor(message) {
    super(message)
    this.name = 'Не указан токен'
  }
}