import React, { useState } from 'react';
import axios from 'axios';
import './search.css';
import { ConversationPage } from 'twilio/lib/rest/conversations/v1/service/conversation';
import noImgAvail from './no_img_avail.png';

let img = null;

const SearchMovieFeedEntry = ({ movie, onClick }) => {
  const [state, setState] = useState('');

  const getSummary = () => {
    // console.log(movie);
    let summary = movie.overview.replace(/<p>|<\/p>/g, '');
    const output = [];
    while (summary.length > 0) {
      if (summary.search(/<i>/) !== -1) {
        output.push(summary.slice(0, summary.search(/<i>/)));
        summary = summary.slice(summary.search(/<i>/) + 3);

        const italic = summary.slice(0, summary.search(/<\/i/));
        output.push(<i key={italic + summary.search(/<i>/)}>{italic}</i>);
        summary = summary.slice(summary.search(/<\/i>/) + 4);
      } else if (summary.search(/<b>/) !== -1) {
        output.push(summary.slice(0, summary.search(/<b>/)));
        summary = summary.slice(summary.search(/<b>/) + 3);

        const bold = summary.slice(0, summary.search(/<\/b/));
        output.push(<b key={bold + summary.search(/<b>/)}>{bold}</b>);
        summary = summary.slice(summary.search(/<\/b>/) + 4);
      } else {
        output.push(summary);
        summary = '';
      }
    }

    return output;
  };

  const getImage = () => {
    axios.get(`/search/movies/extra/${movie}`).then(({ data }) => {
      img = data.poster;
    }).catch();

    if (movie.backdrop_path !== null) {
      console.log(img);
      return img;
    }
  };

  const getPicUnavail = () => {
    if (img === null) {
      console.log(img);
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
            setState(getSummary());
          }}
        >
          Summary
        </button>

        <div className="show-summary">
          {state}
        </div>

      </div>
    </div>
  );
};

export default SearchMovieFeedEntry;
