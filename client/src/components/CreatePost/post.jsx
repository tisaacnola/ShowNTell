import React, { useState } from 'react';
import './post.css';

const Post = ({ user, createPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [show, setShow] = useState('');
  const [error, setError] = useState('');

  const onClick = () => {
    if (show !== 'none' && title !== '') {
      createPost({ title, content, show, poster: user._id });
      setTitle('');
      setContent('');
    } else if (title === '') {
      setError('Must have a title.');
    }
  };

  return (
    <div>
      <h1 id="header">Post</h1>
      <select onChange={(e) => setShow(e.target.value)}>
        <option id="choose-show" value="none">Choose a Show</option>
        {user.subscriptions.map((sub, i) => <option key={sub + i} value={sub}>{sub}</option>)}
      </select>
      <div className="title-container">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div className="content-container">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Text" />
      </div>
      <button id="submit-button" onClick={onClick}>Submit Post</button>
      <h4 style={{ color: 'red' }}>{error}</h4>
    </div>
  );
};

export default Post;
