export const acc = (items, list) => {

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          list[i].style.height = items[i].classList.contains('footer-item_active') ?
            '' : `${list[i].scrollHeight}px`;
          items[i].classList.toggle('footer-item_active');
          items[i].classList.toggle('footer__title--type_open');
          items[i].classList.toggle('footer__title--type_close');
        } else {
          items[i].classList.remove('footer__title--type_open');
          items[i].classList.remove('footer-item_active');
          list[i].style.height = 0;
          items[i].classList.add('footer__title--type_close');
        }
      }
    });
  });
};

export const deleteAcc = (items, list) => {

  const newItems = [];
  newItems.push(items[0], items[1]);

  const newlist = [];
  newlist.push(list[0], list[1]);

  newItems.forEach((item, index) => {
    item.classList.remove('footer__title--type_open');
    item.classList.remove('footer-item_active');
    item.classList.add('footer__title--type_close');
  })

  newlist.forEach((item, index) => {
    item.removeAttribute("style");
  });
}
