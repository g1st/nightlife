import autocomplete from './modules/autocomplete.js';
import goingButton from './modules/goingButton.js';

autocomplete(
  document.querySelector('#search'),
  // document.querySelector('#lat'),
  // document.querySelector('#lng'),
  document.querySelector('#searchForm')
);
