/* eslint-disable max-len */
import React, { useState } from 'react';
import FollowItem from './followitem.jsx';

const Following = (props = {}) => {
  const { followingList, user, setUser } = props;
  return (
    <div>
      {followingList.map((friend) => <FollowItem key={friend.id} friend={friend} user={user} setUser={setUser} />)}
    </div>
  );
};

export default Following;
