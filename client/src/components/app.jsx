/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import Nav from './nav.jsx';
import Sub from './sub.jsx';
import Post from './post.jsx';

const App = () => {
  const [user, setUser] = useState();
  const [view, setView] = useState('login');

  const getUser = () => {
    axios.get('/user')
      .then(({ data }) => setUser(data));
  };
  getUser();

  const changeView = (newView) => {
    setView(newView);
  };

  const getView = () => {
    if (view === 'sub') {
      return <Sub />;
    }
    if (view === 'post') {
      return <Post />;
    }
  };

  return (
    <div>
      {user
        ? <Nav user={user} onClick={changeView} />
        : (
          <a
            href="/auth/google"
            onClick={(e) => setUser(e)}
          >
            login with google
          </a>
        )}
      {getView()}
    </div>
  );
};

export default App;
