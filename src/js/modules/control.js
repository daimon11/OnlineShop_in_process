// import {updateData} from './serviceStorage.js';

export const basketControl = (data, products) => {
  console.log('basketControl', data);
  data.forEach(element => {
    element.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.buy__btn-plus')) {
        const id = target.closest('.buy__item').id
        console.log('до', products[products.findIndex(item => item.id === id)].count)
        products[products.findIndex(item => item.id === id)].count += 1;
        console.log('после', products[products.findIndex(item => item.id === id)].count);
        console.log('итог', products);
        setStorage('basket', products);
      };
    })
  });
};