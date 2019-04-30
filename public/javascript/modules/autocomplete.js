import ajaxSearch from './ajaxSearch.js';

function autocomplete(input, form) {
  if (input) {
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      if (lat) {
        document.querySelector('.loading').innerText = 'Searching...';
        ajaxSearch(lat, lng);
      }
    });

    // show what user was searching after login redirect
    if (sessionStorage.getItem('search') !== undefined) {
      document.querySelector('#search').value = sessionStorage.getItem(
        'search'
      );
      const lat = sessionStorage.getItem('lat');
      const lng = sessionStorage.getItem('lng');
      if (lat) {
        ajaxSearch(lat, lng);
        sessionStorage.removeItem('search');
        sessionStorage.removeItem('lat');
        sessionStorage.removeItem('lng');
      }
    }
    // if someone hits enter on address field dont submit the form
    input.addEventListener('keydown', e => {
      if (e.keyCode === 13) e.preventDefault();
    });
  }
}

export default autocomplete;
