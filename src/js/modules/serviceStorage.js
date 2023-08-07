export const getStorage = () => {
  const arr = localStorage.getItem('basket') ?
    JSON.parse(localStorage.getItem('basket')) : [];
  console.log('getStorage', arr);
  return arr;
};

export const setStorage = (key, value) => {
  const obj = JSON.stringify(value);
  localStorage.setItem(key, obj);
};

export const removeStorage = (id, data) => {
  id = +id;
  for (let i = 0; i < data.length; i++) {
    if (id === data[i].id) {
      data.splice(i, 1);
    }
  }
  setStorage('basket', data);
};

export const updateData = (product, arr) => {

  console.log('updateData arr', arr);
  console.log('updateData product', product);

  const foundItem = arr.find(item => item.id === product.id);
  console.log('foundItem', foundItem);

  if (foundItem) {
    foundItem.count++;
  } else {

    arr.push({
      id: product.id,
      count: 1,
      price: product.price,
      discount: product.discount,
    });
  }

}