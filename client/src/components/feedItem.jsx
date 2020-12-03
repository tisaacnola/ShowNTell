/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import axios from 'axios';

const FeedItem = ({ post, handleUserClick }) => {
  const [liked, setLiked] = useState(post.liked);
  const [commentClicked, setCommentClicked] = useState(false);
  const [respondClicked, setRespondClicked] = useState(false);
  const [respondId, setRespondId] = useState('');
  const [likedCount, setLikedCount] = useState(post.likedCount);

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
    width: '100%',
  };

  const buttons = {
    width: '10%',
    margin: '10px',
    display: 'inline-block',
  };

  const handleLiked = () => {
    axios
      .post('/liked', { postId: post._id, liked: !liked })
      .then(({ data }) => {
        console.log('DATA', data);
        setLiked(data.liked);
        setLikedCount(data.likedCount);
      })
      .catch((err) => console.log(err));
  };

  const handleCommentClicked = () => setCommentClicked(!commentClicked);
  const handleRespondClicked = (id) => setRespondId(id);

  const handleSubmit = (e) => {
    setCommentClicked(!commentClicked);
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
        setCommentsList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => setCurrentComment(event.target.value);

  return (
    <div style={mainDiv}>
      <div style={{ border: '3px solid lightgrey' }}>
        <div style={{ display: 'block' }}>
          Posted By:{' '}
          <h3 style={{ display: 'inline' }} onClick={handleUserClick}>
            {post.name}
          </h3>{' '}
          in{' '}
          <h3 style={{ display: 'inline' }}>
            {post.show || 'insert show here'}
          </h3>
        </div>
        <h3>POST TITLE: {post.title}</h3>
        <p>POST CONTENT: {post.content}</p>
      </div>
      <div style={{ display: 'block' }}>
        {liked ? (
          <button
            onClick={handleLiked}
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
          <button onClick={handleLiked} style={buttons}>
            Like
          </button>
        )}
        <p style={{ display: 'inline' }}>{likedCount}</p>
        <button onClick={handleCommentClicked} style={buttons}>
          Comment
        </button>
      </div>
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
              {comment.childComments.length > 0 ? (
                <div style={{ marginLeft: '50px' }}>
                  <h3>Responses</h3>
                  {comment.childComments.map((childComment, i) => {
                    return (
                      <h4 key={i + childComment} style={{ color: 'red' }}>
                        {childComment}
                      </h4>
                    );
                  })}{' '}
                </div>
              ) : null}
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
