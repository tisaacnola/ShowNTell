/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import axios from 'axios';
import React, { useState } from 'react';
import './search.css';
import noImgAvail from './no_img_avail.png';
import SearchCastAndCrew from './SearchCastAndCrew.jsx';
import Info from './Info.jsx';

const SearchFeedEntry = ({ show, onClick }) => {
  const [state, setState] = useState('');

  const [open, setOpen] = useState(false);

  const [videoResultId, setVideoResultId] = useState('');

  const search = (showName) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${showName += 'trailer'}&key=${process.env.YOUTUBE_API_KEY}`)
      .then(({ data }) => {
        setVideoResultId(data.items[0].id.videoId);
      })
      .catch((error) => console.error(error));
  };

  // console.log(show);
  // All this is doing is parsing show.summary object.
  const getSummary = () => {
    let summary = show.summary.replace(/<p>|<\/p>/g, '');
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

  const handleOpen = (event) => {
    setVideoResultId(search(show.name));
    setState(getSummary());
    setOpen(true);
  };

  const handleClose = () => {
    setState('');
    setOpen(false);
  };

  // if there is an image, get the image
  const getImage = () => {
    if (show.image !== null) {
      return show.image.medium;
    }
  };
  // if no image, get the new image
  const getPicUnavail = () => {
    if (show.image === null) {
      return noImgAvail;
    }
  };

  return (
    <>
      <div className="show-card">
        <div className="show-name" value={show.id} onClick={() => onClick(show)}>
          <div className="show-name">{show.name}</div>
          {/* the app will check for an image and present it */}
          <img
            className="show-img"
            onClick={(event) => {
              event.stopPropagation();
              handleOpen();
            }}
            src={getImage()}
            alt=""
          />
          <img
            className="unavail-img"
            onClick={(event) => {
              event.stopPropagation();
              handleOpen();
            }}
            src={getPicUnavail()}
            alt=""
          />
          {/* <button
            className="summary-button"
            onClick={(event) => {
              event.stopPropagation();
              setState(getSummary());
            }}
          >
            Summary
          </button> */}
          {/* <div className="show-summary">
            {state}
          </div> */}
          <SearchCastAndCrew
            className="cast-crew"
            key={show.id}
            show={show}
          />
        </div>
      </div>
      <div>
        {open ? <Info videoResultId={videoResultId} show={show} open={open} handleClose={handleClose} state={state} /> : null}
      </div>
    </>
  );
};

export default SearchFeedEntry;
