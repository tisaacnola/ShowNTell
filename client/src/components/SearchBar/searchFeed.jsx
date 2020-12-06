/* eslint-disable import/order */
import React from 'react';
import SearchFeedEntry from './searchEntry.jsx';
import './search.css';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import ScrollMenu from 'react-horizontal-scrolling-menu';

const SearchFeed = ({ shows, onClick, arrow }) => (
  <div>
    {/* <FaArrowLeft className="arrow-prev" /> */}
    <div className="search-results-header">Search results: </div>
    <div className="scrolling-container">
      {shows.map(({ show }, i) => <SearchFeedEntry classname="search-feed-entry" key={show + i} show={show} onClick={onClick} />)}
    </div>
    {/* <FaArrowRight className="arrow-prev" /> */}
  </div>
);

export default SearchFeed;
