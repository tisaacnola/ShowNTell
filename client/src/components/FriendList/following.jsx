import React, { useState } from 'react';
import FollowItem from './followitem.jsx';

const Following = (props = {}) => {
  const { followingList } = props;
  return (
    <div>
      {followingList.map((friend) => <FollowItem key={friend.id} friend={friend} />)}
    </div>
  );
};

export default Following;
