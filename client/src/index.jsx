import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
let axios = require('axios');
let url = 'http://localhost:1128/repos'
const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get(url)
    .then(response => {
      console.log('these are my repots after refresh\n', response.data);
      setRepos(response.data);
    })
    .catch(err => {
      console.log('err with useeffect fetching repos\n' + err);
    })
  }, [])

  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post(url, {username: term})
      .then(response => {
        axios.get(url)
          .then(response => {
            console.log('these are my repos after a search\n', response.data);
            setRepos(response.data);
          })
          .catch(err => {
            console.log('err getting repos in react\n', err)
          })
      })
      .catch(err => {
        console.log('err posting repos in react\n', err)
      })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));