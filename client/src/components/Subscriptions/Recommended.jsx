import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  const [clicked, setClicked] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [elementShown, setElementShown] = useState('');

  const getRecommends = () => {
    setIsLoaded(false);
    axios.get('https://api.themoviedb.org/3/tv/62517/recommendations?api_key=bde28fb08435e87e8ee72260cc57ce13&language=en-US&page=1')
      .then((response) => setRecommended(response.data.results))
      .then(() => setIsLoaded(true))
      .then(() => console.log('RECOMMENDED:', recommended))
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  };

  useEffect(() => {
    getRecommends();
  }, [clicked]);

  const handleClick = () => {
    setClicked(!clicked);
    console.log(`CLICKED: ${clicked}`);
  };

  const processRecommends = () => {
    recommended.map((recommObj) => {
      const backdropPath = recommObj.backdrop_path;

      const { id, name, overview } = recommObj;

      const noImage = `An image for ${name} is not available`;

      return (
        <div
          key={id}
        >
          <img
            src={backdropPath}
            alt={noImage}
          />
          <h2>{name}</h2>
          <div>
            <button
              onClick={
                () => {
                  return (
                    <p>{overview}</p>
                  );
                }
              }
            >
              show summary
            </button>
          </div>
        </div>
      );
    });
  };

  const processed = processRecommends();

  const showRecommends = () => {
    if (error) {
      setElementShown(
        <div>
          Error:
          {error.message}
        </div>,
      );
    } else if (!isLoaded) {
      setElementShown(
        <h1>Loading...</h1>,
      );
    } else {
      setElementShown(
        <div>{processed}</div>,
      );
    }
  };

  useEffect(() => {
    showRecommends();
  }, [recommended]);

  console.log('PROCESSED:', processed);
  console.log('ELEMENT_SHOWN:', elementShown);

  return (
    <div>
      <button onClick={handleClick}>Recommended</button>
      <div>
        {elementShown}
      </div>
    </div>
  );
};

export default Recommended;
