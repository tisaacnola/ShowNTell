/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendedTV from './RecommendedTV.jsx';
import RecommendedMovie from './RecommendedMovie.jsx';

const RecommendedBoth = ({ user }) => {
  const [current, setCurrent] = useState('Shows');
  const [tvOption, setTvOptions] = useState([]);
  const [gotTvSubs, setGotTvSubs] = useState(false);
  const [gotMovieSubs, setGotMovieSubs] = useState(false);
  const [movieOption, setMovieOptions] = useState([]);
  const [tvSubs, setTvSubs] = useState([]);
  const [movieSubs, setMovieSubs] = useState([]);

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

  const getTvSubs = () => {
    console.log('SUBS_FIRST', tvSubs);
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
      console.log('SUBS_SECOND', tvSubs);
      const promises = tvSubs.map(({ name }) => axios.get(`/gettvdata/${name}`).catch());
      Promise.all(promises)
        .then((results) => results.map((showObj) => showObj.data))
        .then((showObjs) => {
          setTvOptions(showObjs);
        })
        .catch();
    }
  };

  // const getMovieSubs = () => {
  //   console.log(user.movieSubscriptions);
  //   if (!gotMovieSubs) {
  //     const promisesTwo = user.movieSubscriptions.map((movieId) => axios.get(`/movie/${movieId}`).catch());
  //     Promise.all(promisesTwo)
  //       .then((results) => results.map((movie) => movie.data))
  //       .then((movies) => {
  //         setMovieSubs(movies);
  //         setGotMovieSubs(true);
  //       })
  //       .catch();
  //   }
  // };

  const getMovieSubs = () => {
    console.log('MOVIE_SUBS_FIRST:', movieSubs);
    if (!gotMovieSubs) {
      // console.log(movieId)
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

  const getMovieOptionsObjects = () => {
    // if (gotMovieSubs) {
    console.log('MOVIE_SUBS_SECOND:', movieSubs);
    const promises = movieSubs.map(({ title }) => axios.get(`/getmoviedata/${title}`).catch());
    Promise.all(promises)
      .then((results) => results.map((movieObj) => movieObj.data))
      .then((movieObjs) => {
        setMovieOptions(movieObjs);
      })
      .catch();
    // }
  };

  useEffect(() => {
    getTvSubs();
  }, []);

  useEffect(() => {
    getMovieSubs();
  }, []);

  const tvOptions = tvOption.map((showObj) => {
    return {
      value: showObj.id,
      label: showObj.name,
      key: showObj.id,
    };
  });

  const movieOptions = movieOption.map((movieObj) => {
    return {
      value: movieObj.id,
      label: movieObj.name,
      key: movieObj.id,
    };
  });

  // useEffect(() => {
  //   getTvOptionsObjects();
  // }, [gotTvSubs, gotMovieSubs]);

  useEffect(() => {
    getTvOptionsObjects();
  }, [gotTvSubs]);

  useEffect(() => {
    getMovieOptionsObjects();
  }, [gotMovieSubs]);

  // useEffect(() => {
  //   getMovieOptionsObjects();
  // }, [gotTvSubs, gotMovieSubs]);

  const handleClick = () => {
    // e.preventDefault();
    setCurrent((prev) => {
      return prev === 'Shows'
        ? 'Movies'
        : 'Shows';
    });
  };

  return (
    <div>
      <div>
        <button className="switcher" onClick={handleClick} style={{ margin: '7%' }}>
          {current}
        </button>
      </div>
      <div className="recommend-container">
        {
          current === 'Shows'
            ? <RecommendedTV current={current} tvOptions={tvOptions} getTvSubs={getTvSubs} />
            : <RecommendedMovie current={current} movieOptions={movieOptions} getMovieSubs={getMovieSubs} />
        }
      </div>
    </div>
  );
};

export default RecommendedBoth;
