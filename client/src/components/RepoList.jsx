import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <ul>
      {repos.map(repo => (
        <li>
          <div>{repo.name}</div>
          <div>{repo.url}</div>
          <div>{repo.description}</div>
          <div>{repo.favorites}</div>
          </li>
      ))}
    </ul>
  </div>
)

export default RepoList;