import ajaxSearch from './ajaxSearch.js';

function autocomplete(input, form) {
  if (!input) return; // skip if there are no input on the page
  console.log(input);
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log(lat);
    console.log(lng);
    if (lat) {
      ajaxSearch(lat, lng);
    }
  });

  // if someone hits enter on address field dont submit the form for now
  input.addEventListener('keydown', e => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;
