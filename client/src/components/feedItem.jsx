import React, { useState } from 'react';
const FeedItem = ({ post }) => {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.show}</div>
      <div>{post.user}</div>
    </div>
  );
};

export default FeedItem;
