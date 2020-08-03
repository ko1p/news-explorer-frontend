const authFromMobileMenu = (mobileMenu, popupSignin) => {
  mobileMenu.classList.remove('popup_is-opened');
  popupSignin.setContent();
  popupSignin.open();
};

export { authFromMobileMenu as default };
