import React, { useState } from 'react';
import axios from 'axios';

const Followers = (props = {}) => {
  const { followingList } = props;
  return (
    <div>
      {followingList.map((friend) => <h3 id="dms-sub-header" key={friend.id}>{friend.name}</h3>)}
    </div>
  );
};

export default Followers;
