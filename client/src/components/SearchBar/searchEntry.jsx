import React from 'react';
import './search.css';

const SearchFeedEntry = ({ show }) => {
  const getSummary = () => show.summary.replace(/<.>|<\/.>/g, '');
  const getImage = () => {
    if (show.image !== null) {
      return show.image.medium;
    }
  };
  return (
    <div className="show-card">
      <div style={{ color: 'white' }}>
        <h3 className="show-name">{show.name}</h3>
        <div className="show-summary">{getSummary()}</div>
        <img className="show-img" src={getImage()} alt="" />
      </div>
    </div>
  );
};

export default SearchFeedEntry;
