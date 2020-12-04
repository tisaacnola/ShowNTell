import React from 'react';
import SearchFeedEntry from './searchEntry.jsx';
import './search.css';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const SearchFeed = ({ shows, onClick }) => (
  <div>
    <div className="search-results-header">Search results: </div>
    <div className="scrolling-container">
      {shows.map(({ show }, i) => <SearchFeedEntry classname="search-feed-entry" key={show + i} show={show} onClick={onClick} />)}
    </div>
  </div>
);

export default SearchFeed;
