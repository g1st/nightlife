import axios from 'axios';
import goingButton from './goingButton';

function generateSuccessHTMLOutput(data, places) {
  return data
    .map(venue => {
      return `
      <form action="api/${venue.id}" method="POST" class="venue">
          <a href=${venue.url} target="_blank"><img src=${
        venue.image_url
      } alt=${venue.name} width="200px"></a>
          <h2>${venue.name}</h2>
          <p>${venue.price}</p>
          <p>${venue.rating}</p>
          <button type="submit" name="goingButton">${peopleGoing(
            venue.id,
            places
          )} Going</button>
        </form>
      `;
    })
    .join('');
}

function ajaxSearch(lat, lng) {
  axios
    .get('/api/places', {
      params: {
        lat: lat,
        lng: lng
      }
    })
    .then(res => {
      // finish css loading animation
      const resultElement = document.querySelector('.results');
      if (res.data.total === 0) {
        resultElement.innerHTML = `
        <p>Sorry, we cannot find any venues in this area.</p>
        <p><a href="https://www.yelp.com/developers/documentation/v3/supported_locales" target="_blank">Countries supported by Yelp's API</a></p>
        `;
        return;
      }
      resultElement.innerHTML = generateSuccessHTMLOutput(
        res.data.data,
        res.data.places
      );
      const forms = document.querySelectorAll('form.venue');
      forms.forEach(form => {
        form.addEventListener('submit', function(e) {
          goingButton(e, this, lat, lng);
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function peopleGoing(venueId, places) {
  for (const place of places) {
    if (venueId === place.placeId) {
      return place.peopleGoing;
    }
  }
  return 0;
}

export default ajaxSearch;
