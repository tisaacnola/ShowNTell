/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import Nav from './nav.jsx';
import Sub from './sub.jsx';
import Post from './post.jsx';
import DMs from './dms.jsx';
import Notifs from './notifs.jsx';

const App = () => {
  const [user, setUser] = useState();
  const [view, setView] = useState('home');

  const getUser = () => {
    if (!user) {
      axios.get('/user')
        .then(({ data }) => setUser(data));
    }
  };

  const changeView = (newView) => {
    setView(newView);
  };

  const logout = () => {
    axios.get('/logout')
      .then(() => {
        setView('home');
        setUser(null);
      });
  };

  const createPost = (post) => {
    axios.post('/posts', post)
      .then(() => setView('home'))
      .catch();
  };

  const getView = () => {
    if (view === 'sub') {
      return <Sub user={user} />;
    }
    if (view === 'post') {
      return <Post user={user} createPost={createPost} />;
    }
    if (view === 'home') {
      return (<h1>home view</h1>);
    }
    if (view === 'DMs') {
      return <DMs user={user} setUser={setUser} />;
    }
    if (view === 'notifs') {
      return <Notifs />;
    }
  };

  return (
    <div>
      {user
        ? <Nav user={user} onClick={changeView} logout={logout} />
        : (
          <a
            href="/auth/google"
            onClick={(e) => setUser(e)}
          >
            login with google
          </a>
        )}
      {getUser()}
      {getView()}
    </div>
  );
};

export default App;
