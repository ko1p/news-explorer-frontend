import { RENDER_AT_A_TIME } from '../constants/constants';

export default class NewsCardList {
  constructor(cards) {
    this.articleListElement = document.querySelector('.articles-list');
    this.noArticlesBlock = document.querySelector('.no-articles');
    this.heading = document.querySelector('.no-articles__heading');
    this.text = document.querySelector('.no-articles__text');
    this.cards = cards;
    this.buttonMoreArticles = document.querySelector('.results__more-btn');
    this.preloader = document.querySelector('.preloader');
    this.buttonMoreArticles.addEventListener('click', () => this.showMore());
    this.numOfLastRenderedCard = RENDER_AT_A_TIME;
  }

  renderResults() {
    this.buttonMoreArticles.classList.remove('results__more-btn_active');
    this.cards.forEach((card) => this.addCard(card));
  }

  renderLoader(status) {
    if (status === 'on') {
      this.preloader.classList.add('preloader_is-opened');
    } else {
      this.preloader.classList.remove('preloader_is-opened');
    }
  }

  renderError(error) {
    this.noArticlesBlock.classList.add('no-articles_is-opened');
    this.heading.textContent = error.name;
    this.text.textContent = error.message;
  }

  showMore() {
    if (this.sumOfCards > 3) {
      for (let i = this.numOfLastRenderedCard; i < this.numOfLastRenderedCard + 3; i += 1) {
        this.addCard(this.cards[i]);
      }
      this.numOfLastRenderedCard += RENDER_AT_A_TIME;
      this.sumOfCards -= RENDER_AT_A_TIME;
    } else {
      this.buttonMoreArticles.classList.remove('results__more-btn_active');
      for (let i = this.numOfLastRenderedCard;
        i < (this.sumOfCards + this.numOfLastRenderedCard); i += 1) {
        this.addCard(this.cards[i]);
      }
    }
  }

  addCard(card) {
    this.articleListElement.append(card);
  }

  addCardList(cardsList) {
    const alreadyRenderedCards = RENDER_AT_A_TIME;
    this.cards = cardsList;
    this.sumOfCards = cardsList.length - alreadyRenderedCards;
  }
}
