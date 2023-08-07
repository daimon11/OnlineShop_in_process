import { updateQuantity } from './renderProducts.js';
import { setStorage } from './serviceStorage.js';

const updateBasketPrices = (
  data,
  { infoAllSum,
    oldAllSum,
    saleAllSum,
    finalPrice, }
) => {
  console.log('updateBasketPrices', data);

  infoAllSum.innerHTML = `Товары, ${data.reduce((sum, item) => sum + item.count, 0)} шт.`;

  oldAllSum.innerHTML = `${data.reduce((sum, item) => sum + item.price * item.count, 0)} ₽`;

  saleAllSum.innerHTML = `${data.reduce((sum, item) => sum + item.price * (+item.discount / 100) * item.count, 0)} ₽`;

  finalPrice.innerHTML = `${data.reduce((sum, item) => sum + ((item.price - (item.price * +item.discount / 100)) * item.count), 0)} ₽`
};

const searchIndex = (arr, id) => {
  return arr.findIndex(item => item.id === id)
}

export const basketControl = (data, products, basketIcon, elements) => {
  console.log('basketControl', data, products);
  data.forEach(element => {
    element.addEventListener('click', e => {
      const target = e.target;
      const titleBAsketCount = document.querySelector('.title-add');
      if (target.closest('.buy__btn-plus')) {
        const id = target.closest('.buy__item').id
        products[searchIndex(products, id)].count += 1;
        element.querySelector('.buy__digital').innerHTML = products[searchIndex(products, id)].count;
      };

      if (target.closest('.buy__btn-minus')) {
        const id = target.closest('.buy__item').id;
        const idCount = element.querySelector('.buy__digital');
        if (products[searchIndex(products, id)].count >= 2) {
          products[searchIndex(products, id)].count -= 1;
          idCount.innerHTML = products[searchIndex(products, id)].count;
        } else {
          element.remove();
          products.splice(searchIndex(products, id), 1);
        };
      };
      titleBAsketCount.innerHTML = updateQuantity(products);
      basketIcon.innerHTML = updateQuantity(products);
      setStorage('basket', products);
      updateBasketPrices(products, elements);
    })
  });
};