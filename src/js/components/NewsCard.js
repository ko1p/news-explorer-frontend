export default class NewsCard {
  constructor(templateArticle, api) {
    this.api = api;
    this.templateContainer = document.createElement('div');
    this.templateContainer.append(templateArticle.content.cloneNode(true));
    this.template = this.templateContainer.firstElementChild;
  }

  createCard(cardData) {
    const article = this.template.cloneNode(true);
    const articleIcon = this.template.querySelector('.article__icon');
    const articleSaveIcon = article.querySelector('.btn__save');
    const articleDeleteIcon = article.querySelector('.btn__delete');
    const articleKeywordIcon = article.querySelector('.btn__keyword');
    const articleLink = article.querySelector('.article__link');
    const articleImage = article.querySelector('.article__image');
    const articleDate = article.querySelector('.article__date');
    const articleHeading = article.querySelector('.article__heading');
    const articleText = article.querySelector('.article__text');
    const articleSource = article.querySelector('.article__source');
    articleLink.setAttribute('href', cardData.link);
    articleImage.style.backgroundImage = `url('${cardData.image}')`;
    articleDate.textContent = cardData.date;
    articleHeading.textContent = cardData.title;
    articleText.textContent = cardData.text;
    articleSource.textContent = cardData.source;
    articleKeywordIcon.textContent = cardData.keyword;
    if (cardData._id) {
      article.dataset.id = cardData._id;
    }

    if (articleIcon.classList.contains('btn__save')) {
      articleKeywordIcon.style.display = 'none';
      if (!articleIcon.classList.contains('btn__save_not-login')) {
        articleSaveIcon.addEventListener('click', (event) => {
          if (event.target.classList.contains('btn__save_marked')) {
            this.api.removeArticle(article.dataset._id)
              .then((res) => {
                if (res.ok) {
                  event.target.classList.toggle('btn__save_marked');
                }
                return res.json();
              });
          } else {
            this.api.createArticle(cardData)
              .then((res) => {
                if (res.ok) {
                  event.target.classList.toggle('btn__save_marked');
                }
                return res.json();
              })
              .then((res) => {
                article.dataset._id = res.data._id;
              })
              .catch((err) => {
                throw new Error(err);
              });
          }
        });
      }
    } else {
      articleDeleteIcon.addEventListener('click', (event) => {
        const articleId = event.target.parentNode.dataset.id;
        this.api.removeArticle(articleId)
          .then((res) => {
            if (res.ok) {
              if (article.parentNode.childNodes.length === 2) {
                window.location.reload(true);
              }
              event.target.parentNode.remove();
            }
            return res.json();
          });
      });
    }

    return article;
  }

  renderIcon() {
    const articleIcon = this.template.querySelector('.article__icon');

    if (localStorage.page === 'index') {
      articleIcon.classList.add('btn__save');
      if (localStorage.isLoggedIn === 'false') {
        articleIcon.classList.add('btn__save_not-login');
      }
    } else if (localStorage.page === 'articles') {
      articleIcon.classList.add('btn__delete');
    }
  }
}
