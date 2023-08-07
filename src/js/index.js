import { timer } from './modules/timer.js';
import { acc, deleteAcc } from './modules/acc.js';
import { menuControl } from './modules/menuShow.js';
import { renderArticle } from './modules/renderArticlePage.js';
import { preload } from './modules/preloader.js';
import { updateQuantity, renderArticles } from './modules/render.js';
import { getStorage, setStorage, updateData } from './modules/serviceStorage.js';
import { basketControl } from './modules/control.js';
import { initIndex, initBlog, initArticle, initCard, initCategory, initBasket } from './modules/init.js';

// 1 - упорядочить init().then в index.js 
//! 2 - поправить стили в корзине, чтобы скидка была внтури картинки
// 3 - если корзина пустая, то не надо рендерить блоки, а просто надпись что корзина пустая
//! 4 - добавить все стили на кнопки в зависмости от их состояний 
//! 5 - прелоадер должен закрывать всю страницу  
//! 6 - при удалении всех товаров из корзины, должна появляться надпись "коризна пуста"
//! 7 - проверить все страницы сайта в  https://pagespeed.web.dev/

preload.show();

let url = window.location.pathname;
console.log(url);
let htmlName;
url.length < 2 ? htmlName = 'index' : htmlName = url.match(/\/(\w+)\.html/)[1];

console.log('html', htmlName);

let searchParams = new URLSearchParams(window.location.search);

const footerTitles = document.querySelectorAll('.footer__title--type_close');
const footerlists = document.querySelectorAll('.footer__list--type_hidden');

const accRun = acc(footerTitles, footerlists);

const btnMenu = document.querySelector('.header__btn-menu');

const headerCatalog = document.querySelector('.header__menu-block--big_weight');

const footerCatalog = document.querySelector('.footer__catalog');

const profitableWrapper = document.querySelector('.profitable .container');

const basketGoods = document.querySelector('.number-goods');
const basketData = getStorage();

basketGoods.innerHTML = updateQuantity(basketData);

console.log('basketData', basketData);
console.log(updateQuantity(basketData));

btnMenu.disabled = true;

menuControl(btnMenu, document.querySelector('.header__menu-group'));


if (htmlName === 'index') {

  const timerElem = document.querySelector('.main-promotion__timer');
  const deadline = timerElem.getAttribute('data-deadline');

  timer(timerElem, deadline);

  console.log('index !!!');

  initIndex().then(result => {
    console.log('init().then');
    btnMenu.disabled = false;
    profitableWrapper.append(result[0]);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    preload.remove();
  })

}

if (htmlName === 'blog') {

  let page = searchParams.get("page") ?
    searchParams.get("page") : 1;

  let currentActive = +page;

  initBlog(currentActive).then(result => {
    renderArticles(currentActive, result[0]);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    btnMenu.disabled = false;
    preload.remove();
  });
}

if (htmlName === 'article') {
  let id = searchParams.get("id") ?
    searchParams.get("id") : '';
  const articleModal = document.querySelector('.article__wrapper');

  initArticle(id).then(result => {
    renderArticle(
      id,
      articleModal,
      result[0],
      result[1],
    );
    headerCatalog.append(result[2]);
    footerCatalog.append(result[3]);
    btnMenu.disabled = false;
    preload.remove();
  });
}

if (htmlName === 'category') {
  console.log('basket !!!');
  const category = decodeURI(window.location.href).split('?')[1];

  initCategory(category).then(result => {
    profitableWrapper.append(result[0]);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    btnMenu.disabled = false;
    preload.remove();
  })
};

if (htmlName === 'card') {

  const id = new URL(window.location.href).search.substring(1);
  console.log('id', id);

  initCard(id, profitableWrapper).then(result => {
    document.querySelector('.page .container').append(result[0].card);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    profitableWrapper.innerHTML = '';
    profitableWrapper.append(result[3]);
    btnMenu.disabled = false;
    preload.remove();

    const btnAdd = document.querySelector('.card__btn-add');

    btnAdd.addEventListener('click', () => {
      updateData(result[0].product, basketData);

      basketGoods.innerHTML = updateQuantity(basketData);
      setStorage('basket', basketData);
    });
  });

  console.log('card !!!');
};

if (htmlName === 'basket') {
  console.log('basketData', basketData);

  initBasket(profitableWrapper, basketData).then(result => {
    btnMenu.disabled = false;
    preload.remove();
    profitableWrapper.innerHTML = '';
    profitableWrapper.append(result[0]);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    document.querySelector('.buy__basket').append(result[3].buyList);

    const infoAllSum = document.querySelector('.buy__items-info-count--type_all_prod');
    const oldAllSum = document.querySelector('.buy__items-info--type_sum');
    const saleAllSum = document.querySelector('.buy__items-info--type_discount');
    const finalPrice = document.querySelector('.buy__title-item--type_sum');
    const titleCount = document.querySelector('.title-add');

    console.log('result !!!', result);

    finalPrice.innerHTML = result[3].allSum + ' ₽';
    infoAllSum.innerHTML = `Товары, ${result[3].allCount} шт.`
    oldAllSum.innerHTML = result[3].allSum + result[3].alldiscount + ' ₽';
    saleAllSum.innerHTML = result[3].alldiscount + ' ₽';
    titleCount.innerHTML = updateQuantity(basketData);
    document.querySelector('.buy__shiping-wrapper').append(result[3].imagesBlock);

    basketControl(
      document.querySelectorAll('.buy__item'),
      basketData,
      basketGoods,
      {
        infoAllSum,
        oldAllSum,
        saleAllSum,
        finalPrice,
      });
  });
  console.log('basket !!!');
};

window.addEventListener('resize', e => {
  if (btnMenu.classList.contains('header__btn-menu--type_open')) {
    btnMenu.click();
  };

  if (window.innerWidth <= 500) {
    deleteAcc(footerTitles, footerlists);
  }
});
