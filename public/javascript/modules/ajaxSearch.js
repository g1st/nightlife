import axios from 'axios';

function generateSuccessHTMLOutput(data) {
  console.log(data[0]);
  let html = '';
  for (let i = 0; i < data.length; i++) {
    html += `
    <div class="venue">
      <h2>${data[i].name}</h2>
      <p>${data[i].price}</p>
      <p>${data[i].rating}</p>
    </div>
    `;
  }
  return html;
}
// <p>${JSON.stringify(data, null, '\t')}<p>

function ajaxSearch(lat, lng) {
  axios
    .get('/api/places', {
      params: {
        lat: lat,
        lng: lng
      }
    })
    .then(res => {
      console.log(res.data.businesses);
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
