import React, { useState } from 'react';
import axios from 'axios';
import Nav from './nav.jsx';

const App = () => {
  const [user, setUser] = useState();
  const getUser = () => {
    axios.get('/user')
      .then(({ data }) => setUser(data));
  };
  getUser();
  return (
    <div>
      {
      user
        ? <Nav user={user} />
        : (
          <a
            href="/auth/google"
            onClick={(e) => setUser(e)}
          >
            login with google
          </a>
        )
    }
    </div>
  );
};

export default App;
