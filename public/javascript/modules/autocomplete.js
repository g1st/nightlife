import ajaxSearch from './ajaxSearch.js';

function autocomplete(input, form) {
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    if (lat) {
      // start css animation
      document.querySelector('.loading').innerText = 'Searching...';
      ajaxSearch(lat, lng);
    }
  });

  // show what user was searching after login redirect
  if (sessionStorage.getItem('search') !== undefined) {
    document.querySelector('#search').value = sessionStorage.getItem('search');
    const lat = sessionStorage.getItem('lat');
    const lng = sessionStorage.getItem('lng');
    if (lat) {
      ajaxSearch(lat, lng);
      sessionStorage.removeItem('search');
      sessionStorage.removeItem('lat');
      sessionStorage.removeItem('lng');
    }
  }
  // if someone hits enter on address field dont submit the form for now
  input.addEventListener('keydown', e => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;
