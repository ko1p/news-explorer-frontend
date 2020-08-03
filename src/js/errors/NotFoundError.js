export default class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Ничего не найдено';
  }
}