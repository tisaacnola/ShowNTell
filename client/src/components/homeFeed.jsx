/* eslint-disable import/extensions */
import React, { useState } from 'react';
import FeedItem from './feedItem.jsx';

const HomeFeed = ({ posts }) => {
  return (
    <div>
      {posts
        ? posts.map((post, i) => <FeedItem post={post} key={post + i} />)
        : null}
    </div>
  );
};

export default HomeFeed;
