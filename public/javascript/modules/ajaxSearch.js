import axios from 'axios';

function generateSuccessHTMLOutput(data) {
  return data
    .map(venue => {
      return `
        <div class="venue">
        <h2>${venue.name}</h2>
        <p>${venue.price}</p>
        <p>${venue.rating}</p>
        </div>
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
      resultElement.innerHTML = generateSuccessHTMLOutput(res.data.businesses);
    })
    .catch(err => {
      console.log(err);
      // resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

const resultElement = document.querySelector('.results');

export default ajaxSearch;
