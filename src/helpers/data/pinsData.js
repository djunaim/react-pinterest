import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${boardId}.json`)
    .then((result) => {
      const allPinsObj = result.data;
      const pins = [];
      if (allPinsObj !== null) {
        Object.keys(allPinsObj).forEach((pinId) => {
          const newPin = allPinsObj[pinId];
          newPin.id = pinId;
          pins.push(newPin);
        });
        resolve(pins);
      }
    })
    .catch((error) => console.error(error));
});

export default { getPinsByBoardId };
