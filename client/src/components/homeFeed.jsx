import React, { useState } from 'react';
import FeedItem from './feedItem.jsx';

const HomeFeed = ({ posts }) => {
  return (
    <div>
      {posts.map((post, i) => (
        <FeedItem post={post} key={post + i} />
      ))}
    </div>
  );
};

export default HomeFeed;
