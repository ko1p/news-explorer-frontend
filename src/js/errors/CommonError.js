export default class CommonError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Что-то пошло не так'
  }
}
