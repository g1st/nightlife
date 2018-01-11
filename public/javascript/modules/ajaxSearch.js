import axios from 'axios';

function generateSuccessHTMLOutput(data, places) {
  return data
    .map(venue => {
      return `
        <form action="api/${venue.id}" method="POST" class="venue">
          <h2>${venue.name}</h2>
          <p>${venue.price}</p>
          <p>${venue.rating}</p>
          <button type="submit">${peopleGoing(venue.id, places)} Going</button>
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
      resultElement.innerHTML = generateSuccessHTMLOutput(
        res.data.data,
        res.data.places
      );
    })
    .catch(err => {
      console.log(err);
      // resultElement.innerHTML = generateErrorHTMLOutput(error);
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

const resultElement = document.querySelector('.results');

export default ajaxSearch;
