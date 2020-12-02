import React from 'react';

const SearchFeedEntry = ({ show }) => {
  const getSummary = () => show.summary.replace(/<.>|<\/.>/g, '');
  const getImage = () => {
    if (show.image !== null) {
      return show.image.medium;
    }
  };
  return (
    <div style={{ color: 'white' }}>
      <h3>{show.name}</h3>
      <div>{getSummary()}</div>
      <img src={getImage()} alt="" />
    </div>
  );
};

export default SearchFeedEntry;
