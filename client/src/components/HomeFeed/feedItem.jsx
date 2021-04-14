import React, { useState } from 'react';
import axios from 'axios';
import './homefeed.css';
import { FaHeart, FaRegCommentDots, FaTimes, FaHandshake } from 'react-icons/fa';
import Reply from './reply.jsx';

const FeedItem = ({ post, user = {}, setPosts, setUser }) => {
  const [show, setShow] = useState();
  const [name, setName] = useState();
  const [like, setLike] = useState();
  const [currentPost, setPost] = useState(post);
  const [number, setNumber] = useState(currentPost.likes.length);
  const [box, setBox] = useState(false);
  const [content, setContent] = useState('');
  const [follow, setFollow] = useState(false);
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

  const toggleFollow = () => {
    if (follow) {
      axios.delete('/unfollow', { follower: user.id, followed: currentPost.user.id })
        .then(setFollow(false));
    } else {
      console.log(user._id);
      console.log(post._id);
      axios.put('/follow', { follower: user._id, followed: post.user }) // not working for some reason
        .then((data) => {
          setUser(data.data);
        })
        .then(setFollow(true));
    }
  };

  return (
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
          </FaHeart>
          <FaHandshake
            className={follow ? 'unfollow-button' : 'follow-button'}
            onClick={() => {
              toggleFollow();
            }}
          />
          {!box && (
            <FaRegCommentDots
              className="comment-btn"
              onClick={() => setBox(true)}
            />
          )}
        </div>
        <div className="post-comment-btn">
          {box && (
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
                  axios
                    .get(`/replys/${currentPost._id}/${content}`)
                    .then(({ data }) => {
                      setContent('');
                      setPost(data);
                      axios.get('/posts').then((result) => {
                        setPosts(result.data);
                      });
                    });
                }}
              >
                submit
              </button>
              <FaTimes
                className="x-btn"
                onClick={() => {
                  setBox(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        {currentPost.comment.map((value, i) => {
          return (
            <Reply
              className="reply"
              key={value + i}
              id={value}
              place={75}
              user={user}
              setPosts={setPosts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeedItem;
