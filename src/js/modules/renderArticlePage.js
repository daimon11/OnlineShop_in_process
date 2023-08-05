import { dateNow } from './renderArticleList.js';
import { createLastLink } from "./createElements.js";

const date = dateNow();

export const renderArticle = async (
  id,
  articleModal, 
  dataAutor,
  dataArticle,
) => {

  createLastLink(dataArticle);

  const params = new URLSearchParams(window.location.search);
  params.append('id', `${id}`);

  const textWrapper = document.createElement('div');
  textWrapper.classList.add('article__text-wrapper');
  textWrapper.innerHTML = `
  <h2 class="article__title">${dataArticle.title}</h2>
  <p class="article__paragraf">${dataArticle.body}</p>
  `;

  const footer = document.createElement('div');
  footer.classList.add('article__footer');
  footer.innerHTML = `
    <a class="article__btn-back" href="#" onclick="window.history.go(-1); return false;">
    <img class="article__btn-back-icon" src="./img/to-back-icon.svg" alt="Иконка стрелки">
    <span class="btn-text">
      К списку статей
    </span>
    </a>

    <div class="article__autor-block">
    <h4 class="article__autor-name">${dataAutor.name ? dataAutor.name : ''}</h4>

    <span class="article__time">${date}</span>

    <div class="article__user-box">

      <figure class="article__user">
        <img src="./img/icon-view.svg" alt="Иконка просмотра" class="article__views-icon">
        <figcaption class="article__views-text">${0}</figcaption>
      </figure>
      <figure class="article__user">
        <img src="./img/icon-chat.svg" alt="Иконка чата" class="article__chat-icon">
        <figcaption class="article__chat-text">${0}</figcaption>
      </figure>

    </div>

    </div>
  `

  articleModal.classList.add('article_visible');
  articleModal.append(textWrapper, footer);
  document.querySelector('.adds-banners').classList.remove('visually-hidden');
};