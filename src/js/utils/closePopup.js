const closePopup = () => {
  const container = document.querySelector('.popup__container');
  const popup = document.querySelector('.popup');
  container.remove();
  popup.classList.remove('popup_is-opened');
};

export { closePopup as default };
