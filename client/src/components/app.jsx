/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage/HomePage.jsx';
import Nav from './nav.jsx';
import HomeFeed from './homeFeed.jsx';
import Sub from './sub.jsx';
import Post from './post.jsx';
import DMs from './dms.jsx';
import Notifs from './notifs.jsx';
import SearchFeed from './searchFeed.jsx';

let executed = false;
const App = () => {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  const [view, setView] = useState('homePage');
  const [search, setSearch] = useState('');
  const [searchedShows, setSearchedShows] = useState([]);
  const [userClicked, setUsersClicked] = useState(false);

  const getUser = () => {
    if (!user) {
      axios
        .get('/user')
        .then(({ data }) => setUser(data))
        .catch();
    }
  };

  const getPosts = () => {
    // if (!posts && user) {
    if (!userClicked) {
      executed = !executed;
      axios
        .get('/posts')
        .then(({ data }) => {
          setPosts(data);
        })
        .catch((err) => console.log(err));
    }
    // }
  };

  const changeView = (newView) => {
    setView(newView);
  };

  const logout = () => {
    axios.get('/logout').then(() => {
      setView('homePage');
      setUser(null);
      setPosts(null);
    });
  };

  const createPost = (post) => {
    axios.get('/user').then(({ data }) => {
      post.name = data.name;
      axios
        .post('/posts', post)
        .then(() => setView('home'))
        .catch();
    });
  };

  const searchShows = () => {
    axios
      .get(`/search/${search}`)
      .then(({ data }) => {
        setView('search');
        setSearch('');
        setSearchedShows(data);
        console.log(data);
      })
      .catch();
  };

  const handleUserClick = (e) => {
    setUsersClicked(!userClicked);
    const usersName = e.target.innerHTML;
    axios.get(`/user/posts/${usersName}`).then(({ data }) => {
      console.log('TESTING', data);
      setPosts(data);
    });
  };

  const handleShowFeed = () => {
    setUsersClicked(!userClicked);
    getPosts();
  };

  const getView = () => {
    if (view === 'homePage') {
      return <HomePage />;
    }
    if (view === 'sub') {
      return <Sub user={user} />;
    }
    if (view === 'post') {
      return <Post user={user} createPost={createPost} />;
    }
    if (view === 'home') {
      return <HomeFeed handleUserClick={handleUserClick} posts={posts} />;
    }
    if (view === 'DMs') {
      return <DMs user={user} setUser={setUser} />;
    }
    if (view === 'notifs') {
      return <Notifs />;
    }
    if (view === 'search') {
      return <SearchFeed shows={searchedShows} />;
    }
  };

  return (
    <div>
      {user ? (
        <Nav
          user={user}
          search={search}
          onClick={changeView}
          logout={logout}
          setSearch={setSearch}
          onSearch={searchShows}
        />
      ) : (
        <a href="/auth/google" onClick={(e) => setUser(e)}>
          login with google
        </a>
      )}
      {getUser()}
      {!executed ? getPosts() : (executed = !executed)}
      {userClicked ? (
        <button onClick={handleShowFeed}>Show Home Feed</button>
      ) : null}
      {getView()}
    </div>
  );
};

export default App;
