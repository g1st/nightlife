const menu_icon = document.querySelector('.icona');
const menu_content = document.querySelector(
  '.site-header__navigation--menu-content'
);

menu_icon.addEventListener('click', () => {
  menu_content.classList.toggle(
    'site-header__navigation--menu-content--visible'
  );
  menu_icon.classList.toggle('active');
  menu_icon.classList.remove('no-animation');
});
