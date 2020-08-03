/* eslint-disable no-underscore-dangle */
export default class Form {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('.form__input');
    this._validateInputElement = this._validateInputElement.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this._getInfo = this._getInfo.bind(this);
    this.inputs.forEach((input) => {
      input.addEventListener('input', () => this._validateInputElement(input));
    });
    this.inputs.forEach((input) => {
      input.addEventListener('input', () => this._validateForm(this.form));
    });
    this.btn = this.form.querySelector('.form__btn');
    this.serverError = form.querySelector('.form__error_server');
    this.inputs.forEach((input) => {
      input.addEventListener('input', (event) => this._getInfo(event));
    });
    this.formInfo = {};
  }

  blockForm(status) {
    if (status === 'on') {
      this.btn.setAttribute('disabled', 'disabled');
      this.inputs.forEach((input) => input.setAttribute('disabled', 'disabled'));
    } else {
      this.btn.removeAttribute('disabled', 'disabled');
      this.inputs.forEach((input) => input.removeAttribute('disabled', 'disabled'));
    }
  }

  setServerError(errorMessage) {
    this._clear();
    this.serverError.classList.add('form__error_active');
    this.serverError.textContent = errorMessage;
  }

  // eslint-disable-next-line class-methods-use-this
  _validateInputElement(inputElement) {
    if (inputElement.checkValidity()) {
      inputElement.nextElementSibling.classList.remove('form__error_active');
    } else {
      inputElement.nextElementSibling.classList.add('form__error_active');
    }
  }

  _validateForm(form) {
    if (Array.from(form.querySelectorAll('.form__input')).every((input) => input.checkValidity())) {
      this.btn.removeAttribute('disabled', 'disabled');
    } else {
      this.btn.setAttribute('disabled', 'disabled');
    }
  }

  _clear() {
    this.inputs.forEach((input) => {
      const inputElement = input;
      inputElement.value = '';
    });
  }

  _getInfo(event) {
    event.preventDefault();
    this.inputs.forEach((input) => {
      this.formInfo[`${input.name}`] = input.value;
    });
    return this.formInfo;
  }
}
