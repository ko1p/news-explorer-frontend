import '../../pages/articles.css';

import MainApi from '../api/MainApi';
import NewsCard from '../components/NewsCard';
import NewsCardList from '../components/NewsCardList';
import setHeader from '../utils/setHeader';
import keywordsResultMessage from '../utils/keywordsResultMessage';
import NotFoundError from '../errors/NotFoundError';
import openMobileMenu from '../utils/openMobileMenu';
import closeMobileMenu from '../utils/closeMobileMenu';
import {
  mobileMenuOpen, mobileMenuClose, mobileMenu, articleTemplate,
  resultsTitle, resultKeywords, articlesList, noArticlesBlock,
} from '../constants/constants';

import { MAIN_API_URL } from '../constants/config';

const mainApi = new MainApi(MAIN_API_URL);
const newsCard = new NewsCard(articleTemplate, mainApi);
const cardList = new NewsCardList();

let savedNewsArticles = [];

if (localStorage.token) {
  setHeader('articles', mainApi);
} else {
  window.location.assign('index.html');
}

mobileMenuOpen.addEventListener('click', () => openMobileMenu(mobileMenu));

mobileMenuClose.addEventListener('click', () => closeMobileMenu(mobileMenu));

mainApi.getArticles()
  .then((res) => res.json())
  .then((res) => res.data)
  .then((articles) => {
    if (articles.length === 0) {
      articlesList.remove();
      resultKeywords.style.display = 'none';
      throw new NotFoundError('Сохраненных статей ещё нет');
    }
    return articles;
  })
  .then((articles) => {
    noArticlesBlock.style.display = 'none';
    const keywordArr = [];
    savedNewsArticles = articles;
    savedNewsArticles.forEach((item) => {
      keywordArr.push(item.keyword);
    });
    resultsTitle.textContent = `${localStorage.userName}, у вас ${savedNewsArticles.length} сохранённых статей`;
    resultKeywords.insertAdjacentHTML('beforeend', `По ключевым словам: ${keywordsResultMessage(keywordArr)}`);
    newsCard.renderIcon();
    return articles;
  })
  .then((articles) => {
    const cardsArray = [];
    articles.forEach((article) => {
      cardsArray.push(newsCard.createCard(article));
    });
    return cardsArray;
  })
  .then((cardsArray) => {
    cardList.addCardList(cardsArray);
    cardList.renderResults();
    cardList.renderResults();
    return cardList;
  })
  .catch((err) => {
    cardList.renderError(err);
    console.log(err);
  });
