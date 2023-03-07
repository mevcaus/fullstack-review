const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  console.log('username from getreposbyusername\n', username);
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let GHurl = `https://api.github.com/users/${username}/repos`;
  let options = {
    url: GHurl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios.get(GHurl, options)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.log('err from GH req\n')
      })
}

module.exports.getReposByUsername = getReposByUsername;