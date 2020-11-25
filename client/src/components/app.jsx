import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState();

  return (
    <div>{
      user
      ? <h1>logged in</h1>
      : <a
      href="/auth/google"
      // style={{color: 'blue'}}
      >sign in</a>
    }</div>
  );
}

export default App;