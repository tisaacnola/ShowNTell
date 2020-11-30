import React, { useState } from 'react';
import axios from 'axios';
import Nav from './nav.jsx';
import HomeFeed from './homeFeed.jsx';

const App = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  // const posts = [
  //   {
  //     user: 'Tea',
  //     show: 'Community',
  //     title: 'Almost as good as the office',
  //     content: 'Abed is funny',
  //   },
  // ];
  let count = 0;
  const getUser = () => {
    axios.get('/user').then(({ data }) => setUser(data));
  };
  getUser();
  const getPosts = () => {
    axios.get('/posts').then(({ data }) => setPosts(data));
  };
  getPosts();

  return (
    <div>
      {user ? (
        <div>
          <Nav user={user} />
        </div>
      ) : (
        <a href="/auth/google" onClick={(e) => setUser(e)}>
          login with google
        </a>
      )}
      <HomeFeed posts={posts} />
    </div>
  );
};

export default App;
