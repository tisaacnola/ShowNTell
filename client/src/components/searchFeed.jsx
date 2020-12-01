import React from 'react';

const SearchFeed = ({ shows }) => (
  <div>
    <h2 style={{ color: 'white' }}>Search Results</h2>
    {shows.map(({ show }, i) => <h4 key={show + i} style={{ color: 'white' }}>{show.name}</h4>)}
  </div>
);

export default SearchFeed;
