import React, { useState } from 'react';
import axios from 'axios';

const Nav = ({ user }) => (
  <div>
    <h1>{`hello ${user.name}`}</h1>
    <button>Home</button>
    <button>list of subs</button>
    <button>post</button>
    <button>notifs</button>
    <button>DMs</button>
    <input />
    <button onClick={() => axios.get('/logout')}>logout</button>
  </div>
);

export default Nav;
