import '../pages/index.css';

import Popup from './components/Popup';
import Form from './components/Form';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import NotFoundError from './errors/NotFoundError';
import ApiKeyInvalidError from './errors/ApiKeyInvalid';
import ApiKeyDisabledError from './errors/ApiKeyDisabled';
import ApiKeyMissingError from './errors/ApiKeyMissing';
import RateLimitedError from './errors/RateLimited';
import UnexpectedError from './errors/UnexpectedError';
import CommonError from './errors/CommonError';
import date from './utils/date';
import setHeader from './utils/setHeader';
import setMobileMenu from './utils/setMobileMenu';
import togglePopupFromTo from './utils/togglePopupFromTo';
import openPopup from './utils/openPopup';
import openMobileMenu from './utils/openMobileMenu';
import closeMobileMenu from './utils/closeMobileMenu';
import authFromMobileMenu from './utils/authFromMobileMenu';
import blockForm from './utils/blockForm';
import closePopup from './utils/closePopup';

import {
  popup, authBtn, signinPopup, mobileMenuOpen, mobileMenuClose, mobileMenu,
  mobileMenuAuthBtn, signupPopup, successpPopup, signinForm, formLinkSignup,
  signupForm, searchForm, searchBtn, resultsSection, articlesList,
  articleTemplate, formLinkSignin, formLinkSuccess, noArticlesBlock, btnMoreArticles,
  RENDER_AT_A_TIME,
} from './constants/constants';

import {
  MAIN_API_URL, NEWS_API_URL, NEWS_API_TOKEN, NEWS_API_DAYS,
} from './constants/config';

const popupSignin = new Popup(signinPopup);
const popupSignup = new Popup(signupPopup);
const popupSuccess = new Popup(successpPopup);
const formSignin = new Form(signinForm);
const formSignup = new Form(signupForm);
const mainApi = new MainApi(MAIN_API_URL);
const newsApi = new NewsApi(NEWS_API_URL, NEWS_API_TOKEN, NEWS_API_DAYS);
const newsCard = new NewsCard(articleTemplate, mainApi);
const cardList = new NewsCardList();

if (localStorage.token) {
  setHeader('index', mainApi);
  setMobileMenu('index', mainApi);
} else {
  localStorage.isLoggedIn = false;
  localStorage.page = 'index';
  // localStorage.page = location.pathname.slice(1,-5);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && popup.classList.contains('popup_is-opened')) {
    closePopup();
  }
});

popup.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup();
  }
});

authBtn.addEventListener('click', () => openPopup(popupSignin));

formLinkSignup.addEventListener('click', () => togglePopupFromTo(popupSignin, popupSignup));

formLinkSignin.addEventListener('click', () => togglePopupFromTo(popupSignup, popupSignin));

formLinkSuccess.addEventListener('click', () => togglePopupFromTo(popupSignup, popupSignin));

mobileMenuOpen.addEventListener('click', () => openMobileMenu(mobileMenu));

mobileMenuClose.addEventListener('click', () => closeMobileMenu(mobileMenu));

mobileMenuAuthBtn.addEventListener('click', () => authFromMobileMenu(mobileMenu, popupSignin));

signinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSignin.blockForm('on');
  mainApi.signin(formSignin.formInfo)
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        localStorage.token = res.token;
        setHeader('index', mainApi);
        popupSignin.close();
      } else {
        throw new Error(res.message);
      }
      return res.token;
    })
    .then((token) => {
      localStorage.token = token;
    })
    .catch((error) => {
      formSignin.setServerError(error.message);
      console.log(error);
    })
    .finally(() => {
      formSignin.blockForm('off');
    });
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSignup.blockForm('on');
  mainApi.signup(formSignup.formInfo)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        togglePopupFromTo(popupSignup, popupSuccess);
      } else {
        throw new Error(res.message);
      }
    })
    .catch((error) => {
      formSignup.setServerError(error.message);
      console.log(error);
    })
    .finally(() => {
      formSignup.blockForm('off');
    });
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  blockForm('on', searchBtn, searchForm);
  resultsSection.classList.remove('results_is-opened');
  noArticlesBlock.classList.remove('no-articles_is-opened');
  while (articlesList.firstChild) {
    articlesList.removeChild(articlesList.firstChild);
  }
  cardList.renderLoader('on');
  newsApi.getNews(searchForm.searchInput.value)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'error') {
        switch (res.code) {
          case 'apiKeyInvalid':
            throw new ApiKeyInvalidError('Указан неверный токен (NewsApi). Перепроверьте его и попробуйте снова.');
          case 'apiKeyDisabled':
            throw new ApiKeyDisabledError('Создайте новый, что возобновить работу с сервисом.');
          case 'apiKeyMissing':
            throw new ApiKeyMissingError('В теле запроса должен быть указан токен');
          case 'rateLimited':
            throw new RateLimitedError('Подождите некоторое время, чтобы возобновить работу.');
          case 'unexpectedError':
            throw new UnexpectedError('Не нужно ничего предпринимать, просто повторите запрос позже.');
          default:
            throw new CommonError('Попробуйте повторите запрос позже.');
        }
      }
      return res;
    })
    .then((res) => {
      if (res.articles.length === 0) {
        cardList.renderLoader('off');
        throw new NotFoundError('К сожалению по вашему запросу ничего не найдено.');
      }
      return res;
    })
    .then((res) => {
      cardList.renderLoader('off');
      const { articles } = res;
      const cardsArray = [];
      newsCard.renderIcon();
      articles.forEach((article) => {
        const cardData = {};
        cardData.keyword = searchForm.searchInput.value;
        cardData.title = article.title;
        cardData.text = article.description;
        cardData.date = date.cardDateTransform(article.publishedAt);
        cardData.source = article.source.name;
        cardData.link = article.url;
        cardData.image = article.urlToImage;
        cardData._id = article._id;
        cardsArray.push(newsCard.createCard(cardData));
      });
      return cardsArray;
    })
    .then((cardsArray) => {
      mainApi.getArticles()
        .then((res) => res.json())
        .then((cards) => cards.data)
        .then((cards) => {
          cards.forEach((item) => {
            cardsArray.forEach((card) => {
              if (card.innerHTML.includes(`${item.link}`)) {
                card.dataset._id = item._id;
                card.querySelector('.btn__save').classList.add('btn__save_marked');
              }
            });
          });
        });
      console.log(cardsArray);

      resultsSection.classList.add('results_is-opened');
      cardList.addCardList(cardsArray);
      if (cardsArray.length <= 3) {
        cardList.renderResults(cardsArray);
      } else {
        btnMoreArticles.classList.add('results__more-btn_active');
        const firstCardIndex = 0;
        for (let i = firstCardIndex; i < RENDER_AT_A_TIME; i += 1) {
          cardList.addCard(cardsArray[i]);
        }
      }
      return cardList;
    })
    .catch((err) => {
      cardList.renderError(err);
      console.log(err);
    })
    .finally(() => {
      blockForm('off', searchBtn, searchForm);
    });
});
