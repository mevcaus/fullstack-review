const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name : {
    type: String, required: true, unique: true
  },
  url: {
    type: String, required:true
  },
  description: String,
  favorites: {
    type: Number, default: 0
  }
});
let Repo = mongoose.model('Repo', repoSchema);

let saves = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const newRepo = new Repo({
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    favorites: repo.stargazers_count
  })

  newRepo.save()
    .then(() => {
      console.log('saved');
    })
    .catch(err => {
      console.log('err saving to db\n', r)
    })
}
module.exports.save = saves;
module.exports.db = Repo;