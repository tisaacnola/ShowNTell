import React, { useState, useEffect } from 'react';
import axios from 'axios';

import noImgAvail from './no_img_avail.png';
import Carousel from './Carousel.jsx';
import RecommendStyle from './RecommendStyle.js';
import RecResultStyle from './RecResultStyle.js';

const RecommendedTV = ({ user, current, tvOptions }) => {
  const [recommendedTV, setRecommendedTV] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectOption, setSelectOption] = useState(0);

  const getTvImage = (show) => {
    let result;
    if (!show.poster_path) {
      result = (<img src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`} alt="" />);
    } else if (!show.poster_path && !show.backdrop_path) {
      result = (<img src={noImgAvail} alt="" />);
    } else {
      result = (<img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt="" />);
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
        <div>{recommendedTV}</div>
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
    axios.get(`/getrectv/${selectOption}`)
      .then((response) => {
        return setRecommendedTV(response.data.results.map((show) => {
          return (
            <RecResultStyle>
              <div
                key={show.id}
                id="rec-item-container"
              >
                <div>
                  {getTvImage(show)}
                </div>
                <div>
                  <div>
                    <h1>{show.name}</h1>
                  </div>
                  {/* <button
                    className="summary-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOverview(show.overview);
                    }}
                  >
                    Summary
                  </button>
                  <div className="show-overview">
                    <p>
                      {overview}
                    </p>
                  </div> */}
                  <div>
                    <p className="overview">
                      {show.overview}
                    </p>
                  </div>
                </div>
              </div>
            </RecResultStyle>
          );
        }));
      })
      .then(() => console.log('RECOMMENDEDTV:', recommendedTV))
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
  }, [recommendedTV, isLoaded, error]);

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
                    tvOptions.map((option) => {
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
                <Carousel recommendedTV={recommendedTV} current={current}>
                  {recommendedTV}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </RecommendStyle>
    </div>
  );
};

export default RecommendedTV;
