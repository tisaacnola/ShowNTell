import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sub.css';

const Sub = ({ user, setView }) => {
  const [subs, setSubs] = useState([]);
  const [movieSubs, setMovieSubs] = useState([]);
  const [gotMovieSubs, setGotMovieSubs] = useState(false);
  const [gotSubs, setGotSubs] = useState(false);

  const getSubs = () => {
    if (!gotSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((show) => show.data))
        .then((shows) => {
          setSubs(shows);
          setGotSubs(true);
        })
        .catch();
    }
  };

  const getMovieSubs = () => {
    if (!gotMovieSubs) {
      const promisesTwo = user.movieSubscriptions.map((movieId) => axios.get(`/movie/${movieId}`).catch());
      Promise.all(promisesTwo)
        .then((results) => results.map((show) => show.data))
        .then((movies) => {
          setMovieSubs(movies);
          setGotMovieSubs(true);
        })
        .catch();
    }
  };

  return (
    <div>
      <h1 id="header">TV Subscriptions:</h1>
      <div>
        {getSubs()}
        {subs.map((sub, i) => (
          <div
            className="sub"
            key={sub + i}
            data-id={sub.id}
            onClick={(e) => setView(e.target.dataset.id)}
          >
            {sub.name}
          </div>
        ))}
        <h1 id="header">Movie Subscriptions:</h1>
        {getMovieSubs()}
        {movieSubs.map((sub, i) => (
          <div
            className="sub"
            key={sub + i}
            data-id={sub.id}
            onClick={(e) => setView(e.target.dataset.id)}
          >
            {sub.name || sub.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sub;
