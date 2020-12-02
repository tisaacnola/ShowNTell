/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import './notifs.css';
import { FaTrashAlt } from 'react-icons/fa';

const Notifs = ({ user, setUser }) => {
  const [number, setNumber] = useState();
    <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans:wght@300&display=swap" rel="stylesheet" />;
    return (
      <div>
        {
      !user.phone ? (
        <div>
          <h1 id="enter-number-header"> enter number to received notifs</h1>
          <input id="enter-number-box" onChange={(e) => setNumber(e.target.value)} />
          <button
            id="enter-number-button"
            onClick={() => axios.post('/number', { number })
              .then(() => axios.get('/user'))
              .then((result) => {
                setUser(result.data);
                const body = 'Welcome to Show&Tell! Congrats on your first notification';
                axios.get(`/notifs/${body}/null`);
              })}
          >
            add number
          </button>
        </div>
      ) : (
        <div>
          <h1 id="header">Notifs page</h1>
          <button
            id="change-number-button"
            onClick={() => axios.post('/number', { number: null })
              .then(() => axios.get('/user'))
              .then((result) => setUser(result.data))}
          >
            change number
          </button>
          <div id="receive-notifs-message">
            {
              // maping over here
              user.notifs.map((text, i) => (
                <div key={text + i}>
                  <h2>{text}</h2>
                  <FaTrashAlt
                    title="delete notification"
                    id="trash-icon"
                    onClick={() => {
                      axios.delete(`/notifs/${i}`)
                        .then(() => {
                          console.log('hit one');
                          axios.get('/user')
                            .then((result) => {
                              console.log('hit two');
                              setUser(result.data);
                            });
                        });
                    }}
                  />
                </div>
              ))
            }
          </div>
        </div>
      )
    }
      </div>
    );
};

export default Notifs;
