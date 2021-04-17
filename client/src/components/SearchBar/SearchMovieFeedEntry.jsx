/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import './search.css';
import noImgAvail from './no_img_avail.png';
import SearchCastAndCrew from './SearchCastAndCrew.jsx';

const SearchMovieFeedEntry = ({ movie, onClick }) => {
  const [state, setState] = useState('');
  const [moviePoster, posterSetter] = useState('');

  const getImage = () => {
    if (movie.title === 'Star Wars: The Last Jedi') {
      movie.title = 'Star Wars Episode VIII';
    }
    axios.get(`/search/movie/${movie.title}`)
      .then(({ data }) => {
        // console.log(`this is the ${movie.title} poster: ${data.Poster}`);
        posterSetter(data.Poster);
      })
      .catch((err) => {
        console.log(err);
      });

    if (moviePoster !== undefined) {
      return moviePoster;
    }
  };

  const getPicUnavail = () => {
    if (moviePoster === undefined) {
      return noImgAvail;
    }
  };

  return (
    <div className="show-card">
      <div className="show-name" value={movie.id} onClick={() => onClick(movie)}>
        <div className="show-name">{movie.title}</div>
        <img className="show-img" src={getImage()} alt="" />
        <img className="unavail-img" src={getPicUnavail()} alt="" />
        <button
          className="summary-button"
          onClick={(event) => {
            event.stopPropagation();
            setState(movie.overview);
          }}
        >
          Summary
        </button>

        <div className="show-summary">
          {state}
        </div>
        {/* <SearchCastAndCrew
          show={show}
        /> */}
      </div>
    </div>
  );
};

export default SearchMovieFeedEntry;

//   const getSummary = () => {
//     let summary = movie.overview.replace(/<p>|<\/p>/g, '');
//     const output = [];
//     while (summary.length > 0) {
//       if (summary.search(/<i>/) !== -1) {
//         output.push(summary.slice(0, summary.search(/<i>/)));
//         summary = summary.slice(summary.search(/<i>/) + 3);

//         const italic = summary.slice(0, summary.search(/<\/i/));
//         output.push(<i key={italic + summary.search(/<i>/)}>{italic}</i>);
//         summary = summary.slice(summary.search(/<\/i>/) + 4);
//       } else if (summary.search(/<b>/) !== -1) {
//         output.push(summary.slice(0, summary.search(/<b>/)));
//         summary = summary.slice(summary.search(/<b>/) + 3);

//         const bold = summary.slice(0, summary.search(/<\/b/));
//         output.push(<b key={bold + summary.search(/<b>/)}>{bold}</b>);
//         summary = summary.slice(summary.search(/<\/b>/) + 4);
//       } else {
//         output.push(summary);
//         summary = '';
//       }
//     }

//     return output;
//   };
