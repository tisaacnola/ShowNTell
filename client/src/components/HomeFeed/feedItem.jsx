/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import axios from 'axios';
import './homefeed.css';
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import Reply from './reply.jsx';

const FeedItem = ({ post, handleUserClick, user }) => {
  const [show, setShow] = useState();
  const [name, setName] = useState();
  const [like, setLike] = useState();
  const [currentPost, setPost] = useState(post);
  const [number, setNumber] = useState(currentPost.likes.length);
  const [box, setBox] = useState(false);
  const [content, setContent] = useState('');
  const getShow = () => {
    if (!show) {
      axios(`/postShow/${currentPost.show}`)
        .then(({ data }) => {
          setShow(data.name);
        });
    }
  };

  const getName = () => {
    if (!name) {
      axios.get(`/postUser/${currentPost.user}`)
        .then(({ data }) => {
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
    <div className="main-post-container">
      {getShow()}
      {getName()}
      {getLike()}
      <h2>{`show:${show}`}</h2>
      <div id="posted-in-show-title">{`title:${currentPost.title}`}</div>
      <h4>{`by:${name}`}</h4>
      <div id="feed-post-content">{currentPost.content}</div>
      <button onClick={() => {
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
      </button>
      <div>{number}</div>
      <div>
        {
          box ? (
            <div>
              <input
                placeholder="say something"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button onClick={() => {
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
          ) : <button onClick={() => setBox(true)}>comment</button>
        }
      </div>
      <div>
        {currentPost.comment.map((value, i) => {
          return (<Reply key={value + i} id={value} place={75} user={user} />);
        })}
      </div>
    </div>
  );
};

export default FeedItem;
