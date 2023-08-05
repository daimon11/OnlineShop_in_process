import { updateQuantity } from './renderProducts.js';
import { setStorage } from './serviceStorage.js';

const searchIndex = (arr, id) => {
  return arr.findIndex(item => item.id === id)
}

export const basketControl = (data, products, basketIcon) => {
  console.log('basketControl', data);
  data.forEach(element => {
    element.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.buy__btn-plus')) {
        const id = target.closest('.buy__item').id
        products[searchIndex(products, id)].count += 1;
        element.querySelector('.buy__digital').innerHTML = products[searchIndex(products, id)].count;
        basketIcon.innerHTML = updateQuantity(products);
        setStorage('basket', products);
      };

      if (target.closest('.buy__btn-minus')) {
        const id = target.closest('.buy__item').id
        console.log('до', products[products.findIndex(item => item.id === id)].count)
        products[searchIndex(products, id)].count > 0 ? products[searchIndex(products, id)].count -= 1 : products.splice(searchIndex(products, id), 1);
        console.log('после', products[searchIndex(products, id)].count);
        console.log('итог', products);
        element.querySelector('.buy__digital').innerHTML = products[searchIndex(products, id)].count > 0 ?         element.querySelector('.buy__digital').innerHTML = products[searchIndex(products, id)].count > 0 : element.remove();
        basketIcon.innerHTML = updateQuantity(products);
        setStorage('basket', products);
      }
    })
  });
};