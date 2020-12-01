/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';

const Nav = ({ user, onClick, logout }) => (
  <div onClick={(e) => {
    if (e.target.className === 'views') {
      onClick(e.target.value);
    }
  }}
  >
    <h1>{`Hello ${user.name}`}</h1>
    <button value="home" className="views">
      Home
    </button>
    <button value="sub" className="views">
      list of subs
    </button>
    <button value="post" className="views">
      post
    </button>
    <button value="notifs" className="views">
      notifs
    </button>
    <button value="DMs" className="views">
      DMs
    </button>
    <input />
    <button onClick={logout}>logout</button>
  </div>
);

export default Nav;
