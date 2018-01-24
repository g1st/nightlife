const menu_icon = document.querySelector('.site-header__navigation--menu-icon');
const menu_content = document.querySelector(
  '.site-header__navigation--menu-content'
);

menu_icon.addEventListener('click', () => {
  console.log('hamburger clicked');
  menu_content.classList.toggle(
    'site-header__navigation--menu-content--visible'
  );
});
