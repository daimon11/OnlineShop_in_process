import { timer } from './modules/timer.js';
import { acc, deleteAcc } from './modules/acc.js';
import { menuControl } from './modules/menuShow.js';
import { paginationControl } from './modules/pagination.js';
import { renderGoods } from './modules/renderArticleList.js';
import { renderArticle } from './modules/renderArticlePage.js';
import { preload } from './modules/preloader.js';
import { loadGoods, loadAutor, loadArticle, loadProducts } from './modules/uploadArticles.js';
import { filterProducts, renderItemProduct, updateQuantity, renderBasket } from './modules/renderProducts.js';
import { getStorage, setStorage, removeStorage, updateData } from './modules/serviceStorage.js';
import { basketControl } from './modules/control.js';

preload.show();

let url = window.location.pathname;
console.log(url);
let htmlName;
url.length < 2 ? htmlName = 'index' : htmlName = url.match(/\/(\w+)\.html/)[1];

const urlProdusts = 'https://quickest-cubic-pyroraptor.glitch.me/api/';

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

const getHeaderList = () => {
  return new Promise(function (resolve) {
    resolve(
      loadProducts(`${urlProdusts}category`, {
        methed: 'get',
        callback: filterProducts,
        parentEl: document.querySelector('.header__menu-block--big_weight'),
        elements: {
          title: {
            tag: 'h5',
            value: 'Каталог',
            class: 'header__menu-title',
          },
          link: {
            href: './category.html?',
            class: 'header__menu-item',
          },
          list: {
            class: 'header__menu-list header__menu-list--big_weight',
          },
          maxQuantity: 10,
        }
      })
    )
  })
};

const getFooterList = () => {
  return new Promise(function (resolve) {
    resolve(
      loadProducts(`${urlProdusts}category`, {
        methed: 'get',
        callback: filterProducts,
        parentEl: document.querySelector('.footer__catalog'),
        elements: {
          title: {
            tag: 'h5',
            value: 'Каталог',
            class: 'footer__title footer__title--type_close',
          },
          link: {
            href: './category.html?',
            class: 'footer__item-link',
          },
          list: {
            class: 'footer__list footer__list--type_hidden',
          },
          maxQuantity: 10,
        }
      })
    )
  })
};

if (htmlName === 'index') {

  const timerElem = document.querySelector('.main-promotion__timer');
  const deadline = timerElem.getAttribute('data-deadline');

  timer(timerElem, deadline);

  console.log('index !!!');

  const init = () => {

    return Promise.all([
      loadProducts(`${urlProdusts}goods/discount`, {
        methed: 'get',
        callback: filterProducts,
        parentEl: profitableWrapper,
        elements: {
          title: {
            tag: 'h4',
            value: 'Это выгодно!',
            class: 'profitable__title',
          },
          link: {
            href: './card.html?',
            class: 'header__menu-item',
          },
          list: {
            class: 'profitable__product-list',
          },
          src: 'https://quickest-cubic-pyroraptor.glitch.me/',
          maxQuantity: 8,
        }
      }),
      getHeaderList(),
      getFooterList()
    ]);
  };

  init().then(result => {
    console.log('init().then');
    btnMenu.disabled = false;
    profitableWrapper.append(result[0]);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    preload.remove();
  })

}

if (htmlName === 'blog') {
  const renderArticles = (page, result) => {

    const btnPrev = document.querySelector('.pagination__btn-prev');
    const btnNext = document.querySelector('.pagination__btn-next');
    const pagesBtn = document.querySelectorAll('.item');

    renderGoods(result);
    paginationControl(btnPrev, btnNext, pagesBtn, page);
  };

  let page = searchParams.get("page") ?
    searchParams.get("page") : 1;

  let currentPage = page;

  let currentActive = +currentPage;

  const data = () => {
    return Promise.all([
      loadGoods(`https://gorest.co.in/public-api/posts?page=${currentPage}`),
      getHeaderList(),
      getFooterList()
    ])

  };

  data().then(result => {
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

  const init = () => {
    return Promise.all([
      loadAutor(id),
      loadArticle(id),
      getHeaderList(),
      getFooterList(),
    ]);
  };

  init().then(result => {
    console.log('Promise.all', result);
    renderArticle(
      id,
      articleModal,
      result[0],
      result[1],
    );
    console.log('result[1], result[2]', result[1], result[2])
    headerCatalog.append(result[2]);
    footerCatalog.append(result[3]);
    btnMenu.disabled = false;
    preload.remove();
  });
}

if (htmlName === 'card') {

  const id = new URL(window.location.href).search.substring(1);
  console.log('id', id);

  const init = () => {
    return Promise.all([
      loadProducts(`${urlProdusts}goods/${id}`, {
        methed: 'get',
        callback: renderItemProduct,
        elements: {
          title: {
            tag: 'h4',
          },
          src: `https://quickest-cubic-pyroraptor.glitch.me/`,
        }
      }),
      getHeaderList(),
      getFooterList(),
      loadProducts(`${urlProdusts}goods/discount`, {
        methed: 'get',
        callback: filterProducts,
        parentEl: profitableWrapper,
        elements: {
          title: {
            tag: 'h4',
            value: 'Это выгодно!',
            class: 'profitable__title',
          },
          link: {
            href: './card.html?',
            class: 'header__menu-item',
          },
          list: {
            class: 'profitable__product-list',
          },
          src: 'https://quickest-cubic-pyroraptor.glitch.me/',
          maxQuantity: 8,
        }
      }),
    ]);
  };

  init().then(result => {

    console.log('basketData', basketData);
    console.log('result', result);

    document.querySelector('.page .container').append(result[0].card);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    profitableWrapper.innerHTML = '';
    profitableWrapper.append(result[3]);
    btnMenu.disabled = false;
    preload.remove();

    const btnAdd = document.querySelector('.card__btn-add');

console.log('card then', result[0].product)

    btnAdd.addEventListener('click', () => {

      updateData(result[0].product, basketData);

      basketGoods.innerHTML = updateQuantity(basketData);
      setStorage('basket', basketData);
      console.log('basketData', basketData);
      console.log('добавил в localStorage');
    });
  });

  console.log('card !!!');
}

if (htmlName === 'basket') {

  const init = () => {
    return Promise.all([
      loadProducts(`${urlProdusts}goods/discount`, {
        methed: 'get',
        callback: filterProducts,
        parentEl: profitableWrapper,
        elements: {
          title: {
            tag: 'h4',
            value: 'Это выгодно!',
            class: 'profitable__title',
          },
          link: {
            href: './card.html?',
            class: 'header__menu-item',
          },
          list: {
            class: 'profitable__product-list',
          },
          src: 'https://quickest-cubic-pyroraptor.glitch.me/',
          maxQuantity: 8,
        }
      }),
      getHeaderList(),
      getFooterList(),
      loadProducts(`${urlProdusts}goods/`, {
        methed: 'get',
        callback: renderBasket,
        elements: basketData,
      })
    ]);
  };

  init().then(result => {
    console.log('result', result);
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
    const titleCount = document.querySelector('.title-add')
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
}

if (htmlName === 'category') {
  console.log('basket !!!');
  const category = decodeURI(window.location.href).split('?')[1];
  console.log('category', category);

  const init = () => {
    return Promise.all([
      loadProducts(`${urlProdusts}goods/`, {
        methed: 'get',
        callback: filterProducts,
        elements: {
          title: {
            tag: 'h4',
            value: category,
            class: 'profitable__title',
          },
          link: {
            href: './card.html?',
            class: 'header__menu-item',
          },
          list: {
            class: 'profitable__product-list',
          },
          src: 'https://quickest-cubic-pyroraptor.glitch.me/',
          maxQuantity: 24,
          category: category,
        }
      }),
      getHeaderList(),
      getFooterList(),
    ]);
  };

  init().then(result => {
    console.log('init().then', result);
    profitableWrapper.append(result[0]);
    headerCatalog.append(result[1]);
    footerCatalog.append(result[2]);
    btnMenu.disabled = false;
    preload.remove();
  })

}

window.addEventListener('resize', e => {
  if (btnMenu.classList.contains('header__btn-menu--type_open')) {
    btnMenu.click();
  };

  if (window.innerWidth <= 500) {
    deleteAcc(footerTitles, footerlists);
  }
});
