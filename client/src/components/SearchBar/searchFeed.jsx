/* eslint-disable no-console */
import React from 'react';
import SearchFeedEntry from './searchEntry.jsx';
import SearchMovieFeedEntry from './SearchMovieFeedEntry.jsx';
import './search.css';

const SearchFeed = ({ shows, movies, addShow, addMovie, arrow }) => (
  <div>
    <div className="search-results-header">TV Shows: </div>
    <div className="scrolling-container">
      {shows.map(({ show }, i) => <SearchFeedEntry classname="search-feed-entry" key={show + i} show={show} onClick={addShow} />)}
    </div>
    <div className="search-results-header">Movies: </div>
    <div className="scrolling-container">
      {/* {console.log(movies)} */}
      {movies.map((movie) => <SearchMovieFeedEntry classname="search-feed-entry" key={movie.id} movie={movie} onClick={addMovie} />)}
    </div>
  </div>
);

export default SearchFeed;
