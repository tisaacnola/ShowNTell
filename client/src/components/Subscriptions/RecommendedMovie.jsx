import React, { useState, useEffect } from 'react';
import axios from 'axios';

import noImgAvail from './no_img_avail.png';
import Carousel from './Carousel.jsx';
import RecommendStyle from './RecommendStyle.js';
import RecResultStyle from './RecResultStyle.js';

const RecommendedMovie = ({ current, movieOptions }) => {
  const [recommendedMovie, setRecommendedMovie] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectOption, setSelectOption] = useState(0);
  const [overview, setOverview] = useState('');

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
    // axios.get(`https://api.themoviedb.org/3/movie/${selectOption}/recommendations?api_key=bde28fb08435e87e8ee72260cc57ce13&language=en-US&page=1`)
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
                  {getMovieImage(movie)}
                </div>
                <div>
                  <div>
                    <h1>{movie.name}</h1>
                  </div>
                  {/* <button
                    className="summary-button"
                    onClick={(e) => {
                      // e.stopPropagation();
                      setOverview(movie.overview);
                    }}
                  >
                    Summary
                  </button>
                  <div className="show-summary">
                    {overview}
                  </div> */}
                  <div>
                    <p className="show-overview">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </RecResultStyle>
          );
        }));
      })
      .then(() => console.log('RECOMMENDEDMovie:', recommendedMovie))
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  };

  const handleClick = () => {
    setClicked(!clicked);
    getRecommends();
  };

  useEffect(() => {
    conditionalRender();
  }, [recommendedMovie, isLoaded, error]);

  return (
    <div>
      <RecommendStyle>
        <div className="outer-container">
          <div className="car-container">
            <div className="rec-container">
              <div>
                <button
                  onClick={handleClick}
                  className="rec-btn"
                >
                  Recommended
                </button>
              </div>
              <div>
                <select
                  onChange={handleOptionChange}
                  id="rec-select"
                >
                  {
                    movieOptions.map((option) => {
                      return (
                        <option
                          key={option.key}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      );
                    })
                  }
                </select>
              </div>
              <div>
                <Carousel recommendedMovie={recommendedMovie} current={current}>
                  {recommendedMovie}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </RecommendStyle>
    </div>
  );
};

export default RecommendedMovie;
