/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import axios from 'axios';
import SearchCastAndCrew from './SearchCastAndCrew.jsx';
import Trailer from './VideoPlayer.jsx';

const Info = ({ videoResultId, open, show, setOpen, handleClose, state }) => {
  return (
    <div id="infoShade">
      <Trailer trailerId={videoResultId} />
      <div className="show-summary">
        {state}
      </div>
      <button className="close-button" onClick={handleClose}>Close</button>
    </div>
  );
};

export default Info;
