import React, { useState, useEffect } from 'react';
import axios from 'axios';

import noImgAvail from './no_img_avail.png';
import Carousel from './Carousel.jsx';
import RecommendStyle from './RecommendStyle.js';
import RecResultStyle from './RecResultStyle.js';

const RecommendedMovie = ({ current, movieOptions, getMovieSubs }) => {
  const [recommendedMovie, setRecommendedMovie] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectOption, setSelectOption] = useState(0);

  const getMovieImage = (movie) => {
    let result;
    if (!movie.poster_path) {
      result = (<img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />);
    } else if (!movie.poster_path && !movie.backdrop_path) {
      result = (<img src={noImgAvail} alt="" />);
    } else {
      result = (<img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />);
    }
    return result;
  };

  const conditionalRender = () => {
    let result;
    if (error) {
      result = (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoaded) {
      result = (<h1 style={{ color: 'ghostwhite' }}>Loading...</h1>);
    } else {
      result = (
        <div>{recommendedMovie}</div>
      );
    }
    return result;
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setSelectOption(value);
  };

  const getRecommends = () => {
    setIsLoaded(false);
    axios.get(`/getrecmovie/${selectOption}`)
      .then((response) => {
        return setRecommendedMovie(response.data.results.map((movie) => {
          return (
            <RecResultStyle>
              <div
                key={movie.id}
                id="rec-item-container"
              >
                <div>
                  <div style={{ height: 'auto', width: '100%' }}>
                    {getMovieImage(movie)}
                  </div>
                  <div>
                    <h1>{movie.title}</h1>
                    <p className="overview">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </RecResultStyle>
          );
        }));
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  };

  const handleClick = () => {
    setClicked(!clicked);
    getRecommends();
  };

  const optionsMap = () => {
    getMovieSubs();
    return movieOptions.map((option) => {
      return (
        <option
          key={option.key}
          value={option.value}
        >
          {option.label}
        </option>
      );
    });
  };

  useEffect(() => {
    conditionalRender();
  }, [recommendedMovie, isLoaded, error]);

  return (
    <RecommendStyle>
      <div className="rec-container">
        <select
          onChange={handleOptionChange}
          id="rec-select"
        >
          {/* {getMovieSubs()} */}
          {optionsMap()}
        </select>
        <button
          onClick={handleClick}
          className="rec-btn"
        >
          Recommended
        </button>
        <Carousel recommendedMovie={recommendedMovie} current={current}>
          {recommendedMovie}
        </Carousel>
      </div>
    </RecommendStyle>
  );
};

export default RecommendedMovie;
