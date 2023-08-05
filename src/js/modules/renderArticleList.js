export const dateNow = () => {
  const option = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return (new Date().toLocaleString('ru', option));
}

export const renderGoods = async (arrData) => {

  console.log('arrData', arrData);

  const articlesList = document.querySelector('.articles__list');


  const date = dateNow();

  arrData.forEach(item => {
    const topic = document.createElement('a');
    topic.className = 'articles__item';
    topic.id = `${item.id}`;
    topic.href = `article.html?id=${item.id}`;
    topic.setAttribute('aria-label', item.title)
    topic.className = 'topic';

    topic.innerHTML = `
    ${(item.image) ?
        `<img src="${image}" alt="Изображение ${item.time}" class="topic__img">` :
        `<source srcset="./img/no-img.avif" type="image/avif">
          <source srcset="./img/no-img.webp" type="image/webp">
          <img class="topic__img" src="./img/no-img.png" width="195"
          height="195" loading="lazy" alt="Изображение для статьи отсутствует">`
      }
      <div class="topic__wrapper">
        <div class="topic__title-wrapper">
          <h2 class="topic__title">${item.title}</h2>
          ${(item.time) ?
        `<time class="topic__time" datetime="${item.time}">${item.time}</time>` :
        `<time class="topic__time" datetime="${date}">${date}</time>`
      }
      </div>

      <div class="topic__user-box">
        <figure class="topic__user">
          <img src="./img/icon-view.svg" alt="Иконка просмотра" class="topic__views-icon">
          <figcaption class="topic__views-text">${0}</figcaption>
        </figure>
        <figure class="topic__user">
          <img src="./img/icon-chat.svg" alt="Иконка чата" class="topic__views-icon">
          <figcaption class="topic__views-text">${0}</figcaption>
        </figure>

    </div>
    `;
    articlesList.append(topic);
  });

  document.querySelector('.pagination').classList.remove('visually-hidden');
};