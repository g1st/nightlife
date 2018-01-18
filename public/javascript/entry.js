import autocompleteGoogle from './modules/autocomplete.js';
import goingButton from './modules/goingButton.js';

autocompleteGoogle(
  document.querySelector('#search'),
  document.querySelector('#searchForm')
);
