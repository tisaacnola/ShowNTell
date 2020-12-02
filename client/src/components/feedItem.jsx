/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';

const FeedItem = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [respondClicked, setRespondClicked] = useState(false);
  const [respondId, setRespondId] = useState('');

  const [currentComment, setCurrentComment] = useState('');
  const [commentsList, setCommentsList] = useState(post.comments || []);
  const [responseList, setResponseList] = useState([]);

  const mainDiv = {
    color: 'white',
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
  const handleRespondClicked = (id) => setRespondId(id);

  const handleSubmit = (e) => {
    e.target.previousSibling.value = '';
    axios
      .post('/addComment', {
        comment: { currentComment, childComments: [] },
        postId: post._id,
      })
      .then(({ data }) => {
        console.log('object', data);
        setCommentsList(data);
      })
      .catch((err) => {});
  };

  const handleRespondSubmit = (e) => {
    e.target.previousSibling.value = '';
    const parentComment =
      e.target.parentElement.parentElement.firstChild.innerHTML;

    axios
      .post('/addResponse', {
        comment: { currentComment, parentComment, postId: post._id },
      })
      .then(({ data }) => {
        console.log('DATA', data);
        setCommentsList(data);
      })
      .catch((err) => {
        console.log('AXIOS');
      });
  };

  const handleChange = (event) => setCurrentComment(event.target.value);

  return (
    <div style={mainDiv}>
      <div>
        <h4>
          Posted By: {post.name} in {post.show}
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
          />
          <button style={buttons} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : null}
      <div>
        <h3>Comments</h3>
        {commentsList.map((comment, i) => {
          return (
            <div
              key={i + comment.currentComment}
              id={i + comment.currentComment}
            >
              <p>{comment.currentComment}</p>
              <h3>Responses</h3>
              {comment.childComments.map((childComment, i) => {
                return (
                  <h4 key={i + childComment} style={{ color: 'red' }}>
                    {childComment}
                  </h4>
                );
              })}
              <button
                onClick={handleRespondClicked.bind(
                  this,
                  i + comment.currentComment
                )}
              >
                Respond
              </button>
              {respondId === i + comment.currentComment ? (
                <div>
                  <textarea
                    placeholder="Respond Here."
                    cols="50"
                    onChange={handleChange}
                  />
                  <button style={buttons} onClick={handleRespondSubmit}>
                    Submit
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedItem;
