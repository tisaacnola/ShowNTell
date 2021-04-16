import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import noImgAvail from './no_img_avail.png';

const RecommendStyle = styled.div`
  display: flex;
  flex-flow: column;
  padding-left: 33%;
  button, select{
    background: rgb(35, 35, 35);
    color: ghostwhite;
    font-size: 14px;
    width: fit-content;
    padding: 0.25rem 0.75rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    box-shadow: -1px -1px 2px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
    :active{
      box-shadow: -1px -1px 1px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
      background: rgb(25, 25, 25);
    }
    :hover{
      box-shadow: -2px -2px 6px rgba(100,100,100, 1), 3px 3px 4px rgba(0,0,0, 1);
    }
  };
  button{
    margin-bottom: 5%;
    margin-left: 1%;
  }
`;

const RecResultStyle = styled.div`
  text-align: center;
  flex: 0 0 auto;
  margin-right: 5px;
  width: 85%;
  height: auto;
  box-shadow: 0px 0px 15px -5px;
  #rec-item-container{
    border: 2px solid ghostwhite;
    margin-left: 2%;
    margin-bottom: 5%;
    display: inline-block;
  };
  p{
    color: #408ac8;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 2%;
    margin-top: 3%;
  };
  img{
    width: 100%;
    height: auto;
  }
`;

const options = [
  { value: '', label: 'Select...', key: 0 },
  { value: 62517, label: 'Rick and Morty', key: 1 },
  { value: 586, label: 'Wag the Dog', key: 2 },
];

const Recommended = ({ user }) => {
  const [recommended, setRecommended] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectOption, setSelectOption] = useState(0);

  // const [subs, setSubs] = useState([]);
  // const [gotSubs, setGotSubs] = useState(false);

  // const getAllSubscriptions = () => {
  //   if (!gotSubs) {
  //     const promises = user.subscriptions.map((movieId) => axios.get(`/movie/${movieId}`))
  //     Promise.all(promises)
  //       .then((results) => results.map((movie) => movie.data))
  //       .then((movies) => {
  //         setSubs(movies);
  //         setGotSubs(true);
  //       })
  //       .catch();
  //   }
  // };

  const getRecommends = () => {
    setIsLoaded(false);
    axios.get(`https://api.themoviedb.org/3/tv/${selectOption}/recommendations?api_key=bde28fb08435e87e8ee72260cc57ce13&language=en-US&page=1`)
      // .then((response) => setRecommended(response.data.results))
      .then((response) => {
      //   setApiResponse(response.data.results);
      //   console.log('API_RESPONSE:', apiResponse);
      // }).then(() => {
        return setRecommended(response.data.results.map((show) => {
          return (
            <RecResultStyle>
              <div
                key={show.id}
                id="rec-item-container"
              >
                <div>
                  <img src={noImgAvail} alt="" />
                </div>
                <div>
                  <p>{show.name}</p>
                </div>
              </div>
            </RecResultStyle>
          );
        }));
      })
      .then(() => console.log('RECOMMENDED:', recommended))
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  };

  // const apiResponseMap = apiResponse.map((show) => {
  //   return (
  //     <div key={show.id}>
  //       <div>
  //         <img src={show.poster_path} alt="" />
  //       </div>
  //       <div>
  //         <h2>{show.name}</h2>
  //       </div>
  //     </div>
  //   );
  // });
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
        <div>{recommended}</div>
      );
    }
    return result;
  };

  const handleClick = () => {
    setClicked(!clicked);
    console.log(`CLICKED: ${clicked}`);
    getRecommends();
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setSelectOption(value);
  };

  useEffect(() => {
    conditionalRender();
  }, [recommended, isLoaded, error]);

  // useEffect();

  return (
    <RecommendStyle>
      <div className="outer-container">
        <div className="car-container">
          <div id="rec-container">
            <div>
              <button
                onClick={handleClick}
                id="rec-btn"
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
                  options.map((option) => {
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
              {recommended}
            </div>
          </div>
        </div>
      </div>
    </RecommendStyle>
  );
};

export default Recommended;
