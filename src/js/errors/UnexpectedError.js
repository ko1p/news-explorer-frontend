export default class UnexpectedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'На сервере произошла ошибка'
  }
}
