export const paginationControl = (btnPrev, btnNext, pagesBtn, currentActive) => {


  pagesBtn.forEach((item, index) => {
    if ((index + 1) === currentActive) {
      item.classList.add('item-active');
    } else {
      item.classList.remove('item-active');
    }
  });

  if (currentActive === 1) {
    btnPrev.setAttribute('disabled', 'disabled');
    btnPrev.querySelector('.item-icon').classList.add('item-icon-disabled');
    btnNext.querySelector('.item-icon').classList.remove('item-icon-disabled');
  } else if (currentActive === 3) {
    btnNext.setAttribute('disabled', 'disabled');
    btnNext.querySelector('.item-icon').classList.add('item-icon-disabled');
    btnPrev.querySelector('.item-icon').classList.remove('item-icon-disabled');
  } else {
    btnPrev.removeAttribute('disabled', 'disabled');
    btnNext.removeAttribute('disabled', 'disabled');
    btnPrev.querySelector('.item-icon').classList.remove('item-icon-disabled');
    btnNext.querySelector('.item-icon').classList.remove('item-icon-disabled');
  }

  const update = () => {
    pagesBtn.forEach((item, index) => {
      if ((index + 1) === currentActive) {
        item.click();
        item.classList.add('item-active');
      } else {
        item.classList.remove('item-active');
      }
    })
  }

  btnNext.addEventListener('click', () => {
    currentActive++;
    if (currentActive >= pagesBtn.length) {
      currentActive = pagesBtn.length;
    } else {
      btnPrev.removeAttribute('disabled');
    }
    update();
  })

  btnPrev.addEventListener('click', () => {
    currentActive--;
    if (currentActive <= 1) {
      currentActive = 1;
    } else {
      btnPrev.removeAttribute('disabled');
    }
    update();
  })
}