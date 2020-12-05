/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import axios from 'axios';
import './homefeed.css';
import { FaHeart, FaRegCommentDots } from 'react-icons/fa';
import Reply from './reply.jsx';

const FeedItem = ({ post, handleUserClick, user = {} }) => {
  const [show, setShow] = useState();
  const [name, setName] = useState();
  const [like, setLike] = useState();
  const [currentPost, setPost] = useState(post);
  const [number, setNumber] = useState(currentPost.likes.length);
  const [box, setBox] = useState(false);
  const [content, setContent] = useState('');
  const getShow = () => {
    if (!show) {
      axios(`/postShow/${currentPost.show}`).then(({ data }) => {
        setShow(data.name);
      });
    }
  };

  const getName = () => {
    if (!name) {
      axios.get(`/postUser/${currentPost.user}`).then(({ data }) => {
        setName(data.name);
      });
    }
  };

  const getLike = () => {
    if (like === undefined) {
      setLike(currentPost.likes.includes(user.id));
    }
  };

  return (
<<<<<<< HEAD
    <div className="main-post-container">
      {getShow()}
      {getName()}
      {getLike()}
      <h2>{`show:${show}`}</h2>
      <div id="posted-in-show-title">{`title:${currentPost.title}`}</div>
      <h4>{`by:${name}`}</h4>
      <div id="feed-post-content">{currentPost.content}</div>
      <button
        onClick={() => {
          axios.get(`/liked/${currentPost._id}`).then(() => {
            if (like) {
              setNumber(number - 1);
            } else {
              setNumber(number + 1);
            }
            setLike(!like);
          });
        }}
      >
        {like ? 'unlike' : 'like'}
      </button>
      <div>{number}</div>
      <div>
        {box ? (
          <div>
            <input
              placeholder="say something"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setBox(false);
                axios
                  .get(`/replys/${currentPost._id}/${content}`)
                  .then(({ data }) => {
                    setContent('');
                    // console.log(data);
                    setPost(data);
                  });
              }}
            >
              submit
            </button>
          </div>
        ) : (
          <button onClick={() => setBox(true)}>comment</button>
        )}
      </div>
      <div>
        {currentPost.comment.map((value, i) => {
          return <Reply key={value + i} id={value} place={75} user={user} />;
=======
    <div>
      <div className="main-post-container">
        {getShow()}
        {getName()}
        {getLike()}
        <h2 className="post-show">{`${show}`}</h2>
        <div id="post-show-title">{`${currentPost.title}`}</div>
        <h4 className="post-author">{`${name}`}</h4>
        <div id="post-content">{currentPost.content}</div>
        <div className="post-btn-container">
          <div className="like-count">{number}</div>
          <FaHeart
            className={like ? 'liked-button' : 'post-like-btn'}
            onClick={() => {
              axios.get(`/liked/${currentPost._id}`)
                .then(() => {
                  if (like) {
                    setNumber(number - 1);
                  } else {
                    setNumber(number + 1);
                  }
                  setLike(!like);
                });
            }}
          >
            {like ? 'unlike' : 'like'}
          </FaHeart>
          {!box && <FaRegCommentDots className="comment-btn" onClick={() => setBox(true)} />}
        </div>

        <div className="post-comment-btn">
          {
          box && (
            <div className="comment-box">
              <input
                className="comment-txt-box"
                placeholder="what are your thoughts?"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button
                className="submit-post-comment-btn"
                onClick={() => {
                  setBox(false);
                  axios.get(`/replys/${currentPost._id}/${content}`)
                    .then(({ data }) => {
                      setContent('');
                      // console.log(data);
                      setPost(data);
                    });
                }}
              >
                submit
              </button>
            </div>
          )
        }
        </div>
      </div>
      <div>
        {currentPost.comment.map((value, i) => {
          return (<Reply className="reply" key={value + i} id={value} place={75} user={user} />);
>>>>>>> ee4e692a8729b260c9d462e9d5e127eee37f02ee
        })}
      </div>
    </div>
  );
};

export default FeedItem;
