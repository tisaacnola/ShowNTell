import React from 'react';
import SearchFeedEntry from './searchEntry.jsx';

const SearchFeed = ({ shows, onClick }) => (
  <div>
    <h2 style={{ color: 'white' }}>Search Results</h2>
    {shows.map(({ show }, i) => <SearchFeedEntry key={show + i} show={show} onClick={onClick} />)}
  </div>
);

export default SearchFeed;
