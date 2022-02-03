/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import axios from 'axios';
import SearchCastAndCrew from './SearchCastAndCrew.jsx';
import Trailer from './VideoPlayer.jsx';

const Info = ({ open, show, setOpen, handleClose, setState, state, getSummary }) => {
  const [videoResultId, setVideoResultId] = useState('');

  const search = (showName) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${showName += 'trailer'}&key=${process.env.YOUTUBE_API_KEY}`)
      .then(({ data }) => {
        setVideoResultId(data.items[0].id.videoId);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div id="infoShade">
      <button
        className="TrailerViewer"
        onClick={(event) => {
          // event.stopPropagation();
          search(show.name);
        }}
      >
        View Clips
      </button>
      <Trailer trailerId={videoResultId} />
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
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Info;
