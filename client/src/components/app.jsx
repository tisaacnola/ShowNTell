import React, { useState } from 'react';
import axios from 'axios';
import Nav from './nav.jsx';
import HomeFeed from './homeFeed.jsx';

const App = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const getUser = () => {
    axios.get('/user').then(({ data }) => setUser(data));
  };
  const getPosts = () => {
    axios.get('/posts').then(({ data }) => setPosts(data));
  };
  getUser();
  getPosts();

  return (
    <div>
      {user ? (
        <div>
          <Nav user={user} />
          <HomeFeed posts={posts} />
        </div>
      ) : (
        <a href="/auth/google" onClick={(e) => setUser(e)}>
          login with google
        </a>
      )}
    </div>
  );
};

export default App;
