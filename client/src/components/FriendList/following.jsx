import React, { useState } from 'react';
import axios from 'axios';

const Following = (props = {}) => {
  const { followingList } = props;
  return (
    <div>
      {followingList.map((friend) => <h3 id="dms-sub-header">{friend.name}</h3>)}
    </div>
  );
};

export default Following;
