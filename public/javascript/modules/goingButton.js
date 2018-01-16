import axios from 'axios';

function goingButton(e, target) {
  e.preventDefault();
  axios
    .post(target.action)
    .then(res => {
      const result = res.data;
      if (!result.update && !result.newPlace) {
        alert('You must be logged in');

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
