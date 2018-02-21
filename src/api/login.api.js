import axios from 'axios';


export function isAuthenticated () {

  if (localStorage.token) {
    return axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${localStorage.token}`)
    .then((response) => {
      if (response.data.name === JSON.parse(localStorage.userProfile).ig) {
        return true;
      }
      return false;
    })
    .catch(function (error) {
     return false;
    });
  }
  return Promise.resolve(false);
};
