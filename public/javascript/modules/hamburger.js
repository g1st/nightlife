const menu_icon = document.querySelector('.menu-icon');
const menu_content = document.querySelector('.menu-content');

menu_icon.addEventListener('click', () => {
  console.log('hamburger clicked');
  menu_content.classList.toggle('visible');
});
