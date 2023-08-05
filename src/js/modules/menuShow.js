export const menuControl = (btn, menu) => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('disable-scroll');
    btn.classList.toggle('header__btn-menu--type_close');
    btn.classList.toggle('header__btn-menu--type_open');
    menu.classList.toggle('header__menu-group--type_close');
  })
}