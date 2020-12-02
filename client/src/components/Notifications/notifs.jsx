/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import './notifs.css';

const Notifs = ({ user, setUser }) => {
  <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans:wght@300&display=swap" rel="stylesheet" />;
  const [number, setNumber] = useState();
  return (
    <div>
      {
      !user.phone ? (
        <div>
          <h1 id="enter-number-header"> enter number to receive notifications:</h1>
          <input id="enter-number-box" onChange={(e) => setNumber(e.target.value)} />
          <button
            id="enter-number-button"
            onClick={() => axios.post('/number', { number })
              .then(() => axios.get('/user'))
              .then((result) => setUser(result.data))}
          >
            add number
          </button>
        </div>
      ) : (
        <div>
          <h1 id="header"> Notifs page</h1>
          <button
            id="change-number-button"
            onClick={() => axios.post('/number', { number: null })
              .then(() => axios.get('/user'))
              .then((result) => setUser(result.data))}
          >
            change number
          </button>
          <div>
            {
              user.notifs.map((text, i) => (<h2 key={text + i}>{text}</h2>))
            }
          </div>
        </div>
      )
    }
    </div>
  );
};

export default Notifs;
