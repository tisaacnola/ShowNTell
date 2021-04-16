import React, { useState } from 'react';
import RecommendedTV from './RecommendedTV.jsx';
import RecommendedMovie from './RecommendedMovie.jsx';

const RecommendedBoth = ({ user }) => {
  const [current, setCurrent] = useState('tv');

  const handleClick = () => {
    setCurrent((prev) => {
      return prev === 'tv'
        ? 'movie'
        : 'tv';
    });
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>
          {current}
        </button>
      </div>
      <div>
        {
          current === 'tv'
            ? <RecommendedTV />
            : <RecommendedMovie />
        }
      </div>
    </div>
  );
};

export default RecommendedBoth;
