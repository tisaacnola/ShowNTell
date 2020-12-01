/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import DMs from './dms.jsx';
import Notifs from './notifs.jsx';

const Nav = ({ user }) => {
  const [page, setPage] = useState('home');
  const loadBody = () => {
    if (page === 'home') {
      return (<h1>home page</h1>);
    } if (page === 'DMs') {
      return <DMs user={user} />;
    } if (page === 'notifs') {
      return <Notifs />;
    }
  };
  return (
    <div>
      <h1>{`hello ${user.name}`}</h1>
      <button>Home</button>
      <button>list of subs</button>
      <button>post</button>
      <button id={(page === 'notifs') ? 'button' : null} onClick={() => setPage('notifs')}>notifs</button>
      <button id={(page === 'DMs') ? 'button' : null} onClick={() => setPage('DMs')}>DMs</button>
      <input />
      <button onClick={() => axios.get('/logout')}>logout</button>
      <div>{loadBody()}</div>
    </div>
  );
};

export default Nav;
