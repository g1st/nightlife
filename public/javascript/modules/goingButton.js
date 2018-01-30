import axios from 'axios';

function goingButton(e, target, lat, lng) {
  e.preventDefault();
  axios
    .post(target.action)
    .then(res => {
      const result = res.data;
      // db rejected request - user not logged in
      // info to redirect user back from where he came
      if (!result.update && !result.newPlace) {
        const form = document.getElementById('search');
        sessionStorage.setItem('offsetTop', e.target.offsetTop);
        sessionStorage.setItem('search', form.value);
        sessionStorage.setItem('lat', lat);
        sessionStorage.setItem('lng', lng);
        window.location.href = `${window.location}login`;
      }
      const number = result.update
        ? result.update.peopleGoing
        : result.newPlace.peopleGoing;
      target.goingButton.innerText = `${number} Going`;
    })
    .catch(err => {
      console.error(err);
    });
}

export default goingButton;
