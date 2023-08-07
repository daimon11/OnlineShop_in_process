import { loadGoods, loadAutor, loadArticle, loadProducts } from './uploadArticles.js';
import { filterProducts, renderItemProduct, updateQuantity, renderBasket } from './render.js';

const urlProdusts = 'https://quickest-cubic-pyroraptor.glitch.me/api/';

const getHeaderList = () => {
  return new Promise(function (resolve) {
    resolve(
      loadProducts(`${urlProdusts}category`, {
        methed: 'get',
        callback: filterProducts,
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

export const initIndex = () => {
  return Promise.all([
    loadProducts(`${urlProdusts}goods/discount`, {
      methed: 'get',
      callback: filterProducts,
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

export const initBlog = (currentPage) => {
  return Promise.all([
    loadGoods(`https://gorest.co.in/public-api/posts?page=${currentPage}`),
    getHeaderList(),
    getFooterList()
  ])
};

export const initArticle = (id) => {
  return Promise.all([
    loadAutor(id),
    loadArticle(id),
    getHeaderList(),
    getFooterList(),
  ]);
};

export const initCard = (id, profitableWrapper) => {
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

export const initCategory = (category) => {
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

export const initBasket = (profitableWrapper, basketData) => {
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