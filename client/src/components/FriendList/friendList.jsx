import React, { useState } from 'react';
import Following from './following.jsx';

const FriendList = () => {
  return (
    <div>
      <h1 id="header">Following</h1>
      <Following />
      <h1 id="header">Followers</h1>
      <h1 id="header">Friends</h1>
    </div>
  );
};

export default FriendList;
