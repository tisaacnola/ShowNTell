import React, { useState } from 'react';
import axios from 'axios';
import Following from './following.jsx';

const FriendList = (props = {}) => {
  const { user } = props;
  console.log(user.following);
  return (
    <div>
      <h1 id="header">Following</h1>
      <Following followingList={user.following} />
      <h1 id="header">Followers</h1>
      <h1 id="header">Friends</h1>
    </div>
  );
};

export default FriendList;
