import { createElements, createLastLink } from "./createElements.js";

//! надо дописать данную функцию на атоматическое обновление сумм в коризне
//  export const renderPrices = (data) => {
//   const finishSum = document.querySelector()
// }

export const updateQuantity = (data) => {
  return data.reduce((acc, item) => acc + item.count, 0)
}

const iterateArray = (arr, maxQuantity) => {
  if (arr.length >= maxQuantity) {
    arr = arr.slice(0, maxQuantity);
  } else {
    const newItem = arr[Math.floor(Math.random() * arr.length)];
    arr.push(newItem);
    iterateArray(arr, maxQuantity);
  }

  return arr;
}

const getCategory = (arr, str) => {

  return arr.filter(item => item.category === str);
}

export const filterProducts = async (data, elements) => {

  let newData;
  if (elements.category) {
    newData = iterateArray(getCategory(data, elements.category), elements.maxQuantity)
  } else {
    newData = iterateArray(data, elements.maxQuantity);
  }

  const template = document.createDocumentFragment();

  const title = createElements(`${elements.title.tag}`, elements.title.class.split(' '));
  title.innerHTML = elements.title.value;
  console.log('createElements', title);

  template.append(title);

  const itemsList = createElements('ul', elements.list.class.split(' '));

  newData.forEach(item => {
    const itemLi = createElements('li', 'profitable__item');
    const itemLink = createElements(
      'a',
      `${elements.link.class}`,
      {
        href: `${elements.link.href}${item.id ? item.id : item}`,
        'aria-label': `${item.title}`
      });

    if (typeof item === "object" && item !== null) {
      itemLink.innerHTML = `
      <img src="${elements.src}${item.image}" alt="${item.title}" class="profitable__item-img" width="420" height="295" loading="lazy">
      <div class="profitable__price">
        <span class="new-price">${item.price - item.price * (item.discount / 100)} ₽</span>
        <span class="old-price">${item.price} ₽</span>
      </div>
      <h4 class="profitable__title-item">${item.title}</h4>
      `

      if (+item.discount > 0) {
        const discountData = createElements('span', 'discount');
        discountData.innerHTML = `${-item.discount}%`;
        itemLink.append(discountData);
      }
    } else {
      itemLink.innerHTML = `${item}`;
    }

    itemLi.append(itemLink);
    itemsList.append(itemLi);
  });

  template.append(itemsList);

  return template;
};

export const renderItemProduct = (data, elements) => {

  console.log('renderItemProduct', data);

  createLastLink(data, true);
  createLastLink(data);

  const card = createElements('div', 'card');
  card.innerHTML = `
  <${elements.title.tag} class="card__title">${data.title}</${elements.title.tag}>
        <div class="card__wrapper">

          <div class="card__price-block">

            <img class="card__img card__img--sale_on" src="${elements.src}${data.image}" alt="${data.title}" height="427">

            ${data.discount > 0 ? `<span class="card__sale">-${data.discount}%</span>` : ''}

            <div class="card__price">

              <div class="card__prices">
                <div class="card__price-container">
                  <span class="card__new-price">${Math.round(data.price - data.price * (data.discount / 100))} ₽</span>
                  ${+data.discount > 0 ?
      `<span class="card__old-price">${Math.round(data.price)}  ₽`
      :
      ``}

                </div>
                <p class="card__credit">
                  В кредит от <span class="card__credit-sum">${data.discount ? `${Math.round((data.price * (1 - data.discount / 100)) / 12)}` : `${Math.round(data.price / 12)}`}</span> ₽
                </p>
              </div>

              <div class="card__buttons">
                <button class="card__btn-add" type="button">Добавить в корзину</button>
                <button class="card__btn-favorite" type="button" aria-label="Добавить в избранное"></button>
              </div>

              <div class="card__info">
                <div class="card__shiping">
                  <span class="card__shiping-title">
                    Доставка
                  </span>
                  <span class="card__shiping-time">
                    1-3 января
                  </span>
                </div>
                <div class="card__salesman">
                  <span class="card__salesman-title">
                    Продавец
                  </span>
                  <span class="card__salesman-name">
                    ShopOnline
                  </span>
                </div>
              </div>

              <button class="card__btn-price-drop">
                Узнать о снижении цены
              </button>

            </div>

          </div>

          <h3 class="card__discription-title">Описание:</h3>
          <p class="card__paragraf">${data.description}</p>

        </div>
  `

  return {card, product: data};
};

const renderImgList = (data) => {
  console.log('renderImgList', data);

  const list = createElements('ul', 'buy__ship-list');

  data.forEach(image => {
    const item = createElements('li', 'buy__ship-item');
    const img = createElements('img', 'buy__ship-img', {
      alt: 'Изображение товара',
      width: 80,
      height: 80,
      src: image,
    });

    item.append(img);
    list.append(item);
  })

  return list;
}

export const renderBasket = (arr, data) => {

  const buyList = createElements('ul', 'buy__list');

  const buyArr = arr.filter(item => {
    return data.some(element => element.id === item.id);
  }).map(item => {
    const matchingElement = data.find(element => element.id === item.id);
    return { ...item, count: matchingElement.count };
  });

  const allImg = [];
  let allCount = 0;
  let allSum = 0;
  let alldiscount = 0;

  buyArr.forEach(item => {
    const itemBuy = createElements('li', 'buy__item', {id: item.id});
    itemBuy.innerHTML = `
      <div class="buy__sel-wrapper">
        <button class="buy__btn-sel buy__btn-sel--type_on">
          <img src="./img/done.svg" alt="" class="icone-done">
        </button>
        <img src="https://quickest-cubic-pyroraptor.glitch.me/${item.image}" alt="Изображение товара" class="buy__img" width="130px"
          max-height="130px">
      </div>

      <div class="buy__description">
        <p class="buy__title-prod">${item.title}</p>
        <p class="buy__color">ID товара: ${item.id}</p>
      </div>

    <div class="buy__quantity">
      <button class="buy__btn-minus">-</button>
      <span class="buy__digital">${item.count}</span>
      <button class="buy__btn-plus">+</button>
    </div>

    <div class="buy__price">
      <span class="buy__new-price">${Math.round(item.price - (item.price * item.discount / 100))} ₽</span>
      <span class="buy__old-price">${item.price} ₽</span>
      <span class="buy__credit">В кредит от ${Math.round(item.price / 12)} ₽ </span>
    </div>

    `;
    allImg.push(`https://quickest-cubic-pyroraptor.glitch.me/${item.image}`);
    allSum += Math.round((item.price - item.price * (item.discount / 100)) * item.count);
    allCount += item.count;
    alldiscount += Math.round(item.price * item.discount / 100);
    buyList.append(itemBuy);
  });

  const imagesBlock = renderImgList(allImg);

  return { buyList, allSum, allCount, alldiscount, imagesBlock };
}