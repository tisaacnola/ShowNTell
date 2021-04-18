/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import FeedItem from '../HomeFeed/feedItem.jsx';

const ShowFeed = ({ showId, subscribe, viewSwitcher }) => {
  const [show, setShow] = useState({});
  const [gotShow, setGotShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const getShowInfo = () => {
    if (!gotShow) {
      axios.get(`/show/${showId}`)
        .then(({ data }) => {
          setShow(data);
          setGotShow(true);
        }).then(() => {
          if (show.posts) {
            const promises = show.posts.map((post) => axios.get(`/post/${post}`).catch());
            return Promise.all(promises);
          }
        }).then((results) => {
          if (results) {
            setPosts(results.map((result) => result.data));
          }
        })
        .catch();
    }
  };

  return (
    <div>
      <h1 className="shw-title">{show.name}</h1>
      <button
        className="sub-btn"
        onClick={() => {
          subscribe(showId);
          alert(`You've added ${show.name} to your subscriptions!`);
          viewSwitcher('sub');
        }}
      >
        subscribe
      </button>
      <div className="sub-page-feed">
        {posts ? posts.map((post, i) => <FeedItem key={post + i} post={post} />) : null}
        {getShowInfo()}
      </div>
    </div>
  );
};

export default ShowFeed;
