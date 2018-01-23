import '../styles/styles.scss';
import autocompleteGoogle from './modules/autocomplete.js';
import goingButton from './modules/goingButton.js';
import hamburger from './modules/hamburger.js';

autocompleteGoogle(
  document.querySelector('#search'),
  document.querySelector('#searchForm')
);
