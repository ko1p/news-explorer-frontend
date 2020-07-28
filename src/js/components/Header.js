import openMobileMenu from '../utils/openMobileMenu';
import closeMobileMenu from '../utils/closeMobileMenu';

export default class Header {
  constructor(props) {
    this.props = props;
    this.fillCollor = this.props.color === 'black' ? 'white' : 'black';
    this.header = `
    <div class="header__container header__container_${this.props.color}">
    <p class="header__logo">NewsExplorer</p>
    <nav class="header__navigation">
      <a class="header__nav-link header__nav-link_active" href="./index.html">Главная</a>
      <a class="header__nav-link header__nav-link_not-active header__articles header__nav-link_hide" href="./articles.html">Сохраненные статьи</a>
      <button class="btn btn__auth header__nav-link header__nav-link_hide">Авторизоваться</button>
      <button class="btn btn__logout header__nav-link header__nav-logout header__nav-link_hide">${this.props.userName}<svg class="header__logout-image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z" fill="currentColor"/>
        </svg></button>
        <button class="btn btn__mobile-menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="16" height="2" fill="${this.fillCollor}"/>
            <rect x="4" y="14" width="16" height="2" fill="${this.fillCollor}"/>
          </svg>
        </button>
    </nav>
  </div>
  `;
  }

  render() {
    const headerContainer = document.querySelector('.header');
    headerContainer.innerHTML = '';
    headerContainer.insertAdjacentHTML('beforeend', this.header);

    const buttonAuth = headerContainer.querySelector('.btn__auth');
    const buttonLogout = headerContainer.querySelector('.btn__logout');
    const savedArticles = headerContainer.querySelector('.header__articles');
    const mobileMenuOpen = document.querySelector('.btn__mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const mobileMenu = document.querySelector('.popup__mobile-menu');

    if (this.props.isLoggedIn) {
      buttonLogout.classList.remove('header__nav-link_hide');
      savedArticles.classList.remove('header__nav-link_hide');
    } else {
      buttonAuth.classList.remove('header__nav-link_hide');
    }

    buttonLogout.addEventListener('click', () => {
      if (this.props.page === 'articles') {
        localStorage.clear();
        this.props.isLoggedIn = false;
        window.location.assign('index.html');
      } else {
        localStorage.clear();
        this.props.isLoggedIn = false;
        window.location.reload(true);
      }
    });

    mobileMenuOpen.addEventListener('click', () => openMobileMenu(mobileMenu));

    mobileMenuClose.addEventListener('click', () => closeMobileMenu(mobileMenu));
  }
}
