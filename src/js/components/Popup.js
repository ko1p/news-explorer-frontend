export default class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement.firstElementChild;
    this.popup = document.querySelector('.popup');
    this.popupElement.querySelector('.popup__close').addEventListener('click', () => this.close());
  }

  setContent() {
    this.popup.appendChild(this.popupElement);
  }

  clearContent() {
    this.popup.firstElementChild.remove();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.clearContent();
    this.popup.classList.remove('popup_is-opened');
  }
}
