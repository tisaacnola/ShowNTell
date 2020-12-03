import React from 'react';
import './sub.css';

const Sub = ({ user }) => (
  <div>
    <h1>Subscriptions</h1>
    {user.subscriptions.map((show, i) => <div key={show + i}>{show}</div>)}
  </div>
);

export default Sub;
