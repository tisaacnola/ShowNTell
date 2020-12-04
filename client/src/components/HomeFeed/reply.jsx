/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import axios from 'axios';
import './homefeed.css';

const Reply = ({ id, place, user }) => {
  const [feed, setFeed] = useState();
  const [message, setMessage] = useState();
  const [name, setName] = useState();
  const [test, setTest] = useState();
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState('');
  const [array, setArray] = useState([]);
  const [currentLike, setCurrentLike] = useState();
  const [likes, setLikes] = useState([]);
  const [number, setNumber] = useState('');

  const getFeed = () => {
    if (!feed) {
      axios.get(`/feeds/${id}`)
        .then(({ data }) => {
          setFeed(data._id);
          setMessage(data.content);
          setTest(data.user);
          setArray(data.comment);
          setLikes(data.likes);
          setNumber(data.likes.length);
        });
    }
  };

  const getName = () => {
    if (test && !name) {
      axios.get(`/postUser/${test}`)
        .then(({ data }) => {
          setName(data.name);
        }).catch((err) => console.log(err));
    }
  };

  const getLike = () => {
    if (test && currentLike === undefined) {
      setCurrentLike(likes.includes(user.id));
    }
  };

  return (
    <div>
      {getFeed()}
      {getName()}
      {getLike()}
      <div>{name || null}</div>
      <h4>{message || null}</h4>
      <button onClick={() => {
        axios.get(`/likedPost/${id}`)
          .then(() => {
            if (currentLike) {
              setNumber(number - 1);
            } else {
              setNumber(number + 1);
            }
            setCurrentLike(!currentLike);
          });
      }}
      >
        {currentLike ? 'unlike' : 'like'}
      </button>
      <div>{number}</div>
      <div>
        {
          reply ? (
            <div>
              <input
                placeholder="say something"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button onClick={() => {
                setReply(false);
                axios.post(`/replys/${feed}/${content}`)
                  .then(({ data }) => {
                    setContent('');
                    setArray(data.comment);
                  });
              }}
              >
                submit
              </button>
            </div>
          ) : <button onClick={() => setReply(true)}>Reply</button>
        }
      </div>
      <div style={{ left: `${place}px`, position: 'relative' }}>
        {array.map((value, i) => {
          return (<Reply key={value + i} id={value} user={user} place={place + 75} />);
        })}
      </div>
    </div>
  );
};

export default Reply;
