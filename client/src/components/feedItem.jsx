import React, { useState } from 'react';
const FeedItem = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const mainDiv = {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid black',
    margin: '10px',
    boxShadow: '5px 5px #888888',
  };

  const changeLiked = () => setLiked(!liked);

  return (
    <div style={mainDiv}>
      <div>
        <h4>
          Posted By: {post.user} in {post.show}
        </h4>
      </div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {liked ? (
        <button
          onClick={changeLiked}
          style={{ width: '10%', margin: '10px', backgroundColor: 'orange' }}
        >
          Liked
        </button>
      ) : (
        <button onClick={changeLiked} style={{ width: '10%', margin: '10px' }}>
          Like
        </button>
      )}
    </div>
  );
};

export default FeedItem;
