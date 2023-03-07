const express = require('express');
let app = express();
let path = require('path');
let axios = require('axios');
let morgan = require('morgan');
let { getReposByUsername } = require(path.join(__dirname, '../helpers/github'));
let { save, db } = require('../database/index');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('this is my req from app.post\n', req);
  console.log('this is my req.body from app.post\n', req.body);
  let username = req.body.username;
  getReposByUsername(username)
    .then(repos => {

      repos.forEach(repo => {
        save(repo);
      })
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find()
    .sort({ favorites: -1 })
    .limit(25)
    .then(repos => {
      console.log('these are my repos\n', repos);
      res.json(repos);
    })
    .catch(err => {
      console.log('err in app.get in server\n', err);
    })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

