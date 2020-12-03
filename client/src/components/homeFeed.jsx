/* eslint-disable import/extensions */
import React, { useState } from 'react';
import FeedItem from './feedItem.jsx';

const HomeFeed = ({ posts, handleUserClick }) => {
  return (
    <div>
      {posts
        ? posts.map((post, i) => (
            <FeedItem
              handleUserClick={handleUserClick}
              post={post}
              key={post + i}
            />
          ))
        : null}
    </div>
  );
};

export default HomeFeed;
