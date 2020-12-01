import React, { useState } from 'react';
import axios from 'axios';
const FeedItem = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const commentsList = [];
  for (let key in post.comments) {
    commentsList.push(post.comments[key]);
  }
  const [comments, setComments] = useState(commentsList);
  const mainDiv = {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid black',
    margin: '10px',
    boxShadow: '5px 5px #888888',
    width: '50%',
  };

  const buttons = {
    width: '10%',
    margin: '10px',
    display: 'inline-block',
  };

  const changeLiked = () => setLiked(!liked);
  const handleCommentClicked = () => setCommentClicked(!commentClicked);
  const handleSubmit = () => {
    axios
      .post('/addComment', { comment: currentComment, postId: post._id })
      .then((posts) => {
        console.log('000000', posts);
      })
      .catch((err) => {
        console.log(err);
      });
    comments.push(currentComment);
    setComments(comments);
  };

  const handleChange = (event) => setCurrentComment(event.target.value);

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
          style={{
            width: '10%',
            margin: '10px',
            backgroundColor: 'orange',
            display: 'inline-block',
          }}
        >
          Liked
        </button>
      ) : (
        <button onClick={changeLiked} style={buttons}>
          Like
        </button>
      )}
      <button onClick={handleCommentClicked} style={buttons}>
        Comment
      </button>
      {commentClicked ? (
        <div>
          <textarea
            placeholder="Insert comment here"
            cols="50"
            onChange={handleChange}
          ></textarea>
          <button style={buttons} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : null}
      <div>
        <h3>Comments</h3>
        {comments.map((comment, i) => (
          <p key={i + comment}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default FeedItem;
