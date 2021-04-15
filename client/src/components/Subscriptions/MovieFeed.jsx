import React, { useState } from 'react';
import axios from 'axios';
import FeedItem from '../HomeFeed/feedItem.jsx';

const MovieFeed = ({ movieId, subscribe }) => {
  const [movie, setMovie] = useState({});
  const [gotMovie, setGotMovie] = useState(false);
  const [posts, setPosts] = useState([]);

  const getMovieInfo = () => {
    if (!gotMovie) {
      axios.get(`/movie/${movieId}`)
        .then(({ data }) => {
          setMovie(data);
          setGotMovie(true);
        }).then(() => {
          if (movie.posts) {
            const promises = movie.posts.map((post) => axios.get(`/post/${post}`).catch());
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
      <h1 className="shw-title">{movie.title}</h1>
      <button className="sub-btn" onClick={() => subscribe(movieId)}>subscribe</button>
      <div className="sub-page-feed">
        {posts ? posts.map((post, i) => <FeedItem key={post + i} post={post} />) : null}
        {getMovieInfo()}
      </div>
    </div>
  );
};

export default MovieFeed;
