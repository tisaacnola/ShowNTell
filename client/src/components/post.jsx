import React, { useState } from 'react';
import axios from 'axios';

const Post = ({ user, createPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [show, setShow] = useState('none');
  const [error, setError] = useState('');
  const [subs, setSubs] = useState([]);
  const [gotSubs, setGotSubs] = useState(false);

  const onClick = () => {
    if (show !== 'none' && title !== '') {
      createPost({ title, content, show, poster: user._id });
      setTitle('');
      setContent('');
    } else if (title === '') {
      setError('Must have a title.');
    } else if (show === 'none') {
      setError('Please choose a show to talk about.');
    }
  };

  const getSubs = () => {
    if (!gotSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((sub) => sub.data))
        .then((shows) => {
          setSubs(shows);
          setGotSubs(true);
        })
        .catch();
    }
  };

  return (
    <div>
      <h1>Post</h1>
      <select onChange={(e) => setShow(e.target.value)}>
        <option value="none">Choose a Show</option>
        {subs.map((sub, i) => <option key={sub + i} value={sub.id}>{sub.name}</option>)}
        {getSubs()}
      </select>
      <div className="title-container">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div className="content-container">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Text" />
      </div>
      <button onClick={onClick}>Submit Post</button>
      <h4 style={{ color: 'red' }}>{error}</h4>
    </div>
  );
};

export default Post;
