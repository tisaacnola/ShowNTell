import React, { useState } from 'react';
const FeedItem = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const comments = [];
  const mainDiv = {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid black',
    margin: '10px',
    boxShadow: '5px 5px #888888',
    width: '50%',
  };

  const changeLiked = () => setLiked(!liked);

  for (let key in post.comments) {
    comments.push(post.comments[key]);
  }

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
      <div>
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <p>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default FeedItem;
