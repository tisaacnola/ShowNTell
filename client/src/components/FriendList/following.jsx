import React, { useState } from 'react';
import axios from 'axios';

const Following = (props = {}) => {
  const { followingList } = props;

  return (
    <div>
      <h3 id="dms-sub-header">Alvin</h3>
      <h3 id="dms-sub-header">Simon</h3>
      <h3 id="dms-sub-header">Theodore</h3>
    </div>
  );
};

export default Following;
