import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendedTV from './RecommendedTV.jsx';
import RecommendedMovie from './RecommendedMovie.jsx';

const RecommendedBoth = ({ user }) => {
  const [current, setCurrent] = useState('Shows');
  const [tvSubs, setTvSubs] = useState([]);
  const [movieSubs, setMovieSubs] = useState([]);
  const [gotMovieSubs, setGotMovieSubs] = useState(false);
  const [gotTvSubs, setGotTvSubs] = useState(false);
  const [tvOption, setTvOptions] = useState([]);
  const [gotTvOptions, setGotTvOptions] = useState(false);
  // const getTvSubs = () => {
  //   if (!gotTvSubs) {
  //     const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
  //     Promise.all(promises)
  //       .then((results) => results.map((show) => show.data))
  //       .then((shows) => {
  //         setTvSubs(shows);
  //         setGotTvSubs(true);
  //       })
  //       .catch();
  //   }
  // };

  // const getTvId = (name) => {
  //   if (!gotTvId) {
  //     const promise = axios.get(`/gettvid/${name}`).catch();
  //     Promise.all(promise)
  //       // .then((response) => response.data.results[0].id)
  //       .then((response) => {
  //         setTvOptionsId(response.data);
  //         setGotTvId(true);
  //       })
  //       .catch();
  //   }
  // };

  const getTvSubs = () => {
    if (!gotTvSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((show) => show.data))
        .then((shows) => {
          setTvSubs(shows);
          setGotTvSubs(true);
        })
        .catch();
    }
  };

  const getTvOptionsObjects = () => {
    if (gotTvSubs) {
      const promises = tvSubs.map(({ name }) => axios.get(`/gettvdata/${name}`).catch());
      Promise.all(promises)
        .then((results) => results.map((showObj) => showObj.data))
        .then((showObjs) => {
          setTvOptions(showObjs);
          setGotTvOptions(true);
        })
        .catch();
    }
  };

  const getMovieSubs = () => {
    if (!gotMovieSubs) {
      const promisesTwo = user.movieSubscriptions.map((movieId) => axios.get(`/movie/${movieId}`).catch());
      Promise.all(promisesTwo)
        .then((results) => results.map((movie) => movie.data))
        .then((movies) => {
          setMovieSubs(movies);
          setGotMovieSubs(true);
        })
        .catch();
    }
  };

  const handleClick = () => {
    setCurrent((prev) => {
      return prev === 'Shows'
        ? 'Movies'
        : 'Shows';
    });
  };

  useEffect(() => {
    getTvSubs();
  }, []);

  useEffect(() => {
    getMovieSubs();
  }, []);

  useEffect(() => {
    getTvOptionsObjects();
  }, [gotTvSubs]);

  // useEffect(() => {
  //   getTvId();
  // }, [tvSubs]);

  // const tvTVOptions = tvSubs.map((showObj) => {
  //   return { [showObj.name]: getTvId(showObj.name) };
  // });
  // console.log(tvTVOptions);

  const tvOptions = tvOption.map((showObj) => {
    // console.log(getTvId(showObj.name));
    return {
      value: showObj.id,
      label: showObj.name,
      key: showObj.id,
    };
  });

  const movieOptions = movieSubs.map((movieObj) => {
    return {
      value: movieObj.id,
      label: movieObj.name,
      key: movieObj.id,
    };
  });

  return (
    <div>
      <div>
        <button className="switcher" onClick={handleClick} style={{ margin: '10%' }}>
          {current}
        </button>
      </div>
      <div className="recommend-container">
        {
          current === 'Shows'
            ? <RecommendedTV current={current} tvOptions={tvOptions} />
            : <RecommendedMovie current={current} movieOptions={movieOptions} />
        }
      </div>
    </div>
  );
};

export default RecommendedBoth;
