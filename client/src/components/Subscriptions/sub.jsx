import React, { useState } from 'react';
import axios from 'axios';

const Sub = ({ user, setView }) => {
  const [subs, setSubs] = useState([]);
  const [gotSubs, setGotSubs] = useState(false);
  const style = { color: 'white' };

  const getSubs = () => {
    if (!gotSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((show) => show.data))
        .then((shows) => {
          setSubs(shows);
          setGotSubs(true);
        })
        .catch();
    }
  };

  return (
    <div>
      <h1 style={style}>Subscriptions</h1>
      {getSubs()}
      {subs.map((sub, i) => (
        <div
          key={sub + i}
          style={style}
          data-id={sub.id}
          onClick={(e) => setView(e.target.dataset.id)}
        >
          {sub.name}
        </div>
      ))}
    </div>
  );
};

export default Sub;
