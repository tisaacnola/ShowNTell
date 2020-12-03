import React, { useState } from 'react';
import axios from 'axios';

const ShowFeed = ({ showId, subscribe }) => {
  const [show, setShow] = useState({});
  const [gotShow, setGotShow] = useState(false);

  const getShowInfo = () => {
    if (!gotShow) {
      axios.get(`/show/${showId}`)
        .then(({ data }) => {
          setShow(data);
          setGotShow(true);
        })
        .catch();
    }
  };

  return (
    <div>
      <h1>{show.name}</h1>
      <button onClick={() => subscribe(showId)}>Subscribe</button>
      {/* {show.posts } */}
      {getShowInfo()}
    </div>
  );
};

export default ShowFeed;
