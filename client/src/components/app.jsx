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
import ShowFeed from './showFeed.jsx';

const App = () => {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  const [view, setView] = useState('homePage');
  const [search, setSearch] = useState('');
  const [searchedShows, setSearchedShows] = useState([]);

  const getUser = () => {
    if (!user) {
      axios.get('/user')
        .then(({ data }) => setUser(data));
    }
  };

  const getPosts = () => {
    if (!posts && user) {
      axios.get('/posts').then(({ data }) => setPosts(data));
    }
  };

  const changeView = (newView) => {
    setView(newView);
  };

  const logout = () => {
    axios.get('/logout')
      .then(() => {
        setView('homePage');
        setUser(null);
        setPosts(null);
      });
  };

  const createPost = (post) => {
    axios
      .post('/posts', post)
      .then(() => setView('home'))
      .catch();
  };

  const searchShows = () => {
    axios.get(`/search/${search}`).then(({ data }) => {
      setView('search');
      setSearch('');
      setSearchedShows(data);
      console.log(data);
    }).catch();
  };

  const addShow = (show) => {
    axios.get(`/show/${show.id}`)
      .then(({ data }) => setView(data.id))
      .catch();
  };

  const subscribe = (showId) => {
    axios.put(`/subscribe/${showId}`)
      .then()
      .catch();
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
      return <HomeFeed posts={posts} />;
    }
    if (view === 'DMs') {
      return <DMs user={user} setUser={setUser} />;
    }
    if (view === 'notifs') {
      return <Notifs />;
    }
    if (view === 'search') {
      return <SearchFeed shows={searchedShows} onClick={addShow} />;
    }
    return <ShowFeed showId={view} subscribe={subscribe} />;
  };

  return (
    <div>
      {user
        ? (
          <Nav
            user={user}
            search={search}
            onClick={changeView}
            logout={logout}
            setSearch={setSearch}
            onSearch={searchShows}
          />
        )
        : (
          <a
            href="/auth/google"
            onClick={(e) => setUser(e)}
          >
            login with google
          </a>
        )}
      {getUser()}
      {getPosts()}
      {getView()}
    </div>
  );
};

export default App;
