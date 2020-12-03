import React, { useState } from 'react';
import './post.css';
import pic from './createpost.png';

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
      <h1 id="header">Create a post</h1>
      <div id="post-sub-header"> share your thoughts with the world!</div>
      <div className="create-post-form">
        <select className="choose-show" onChange={(e) => setShow(e.target.value)}>
          <option className="choose-show" value="none">Choose a Show</option>
          {user.subscriptions.map((sub, i) => <option key={sub + i} value={sub}>{sub}</option>)}
        </select>
        <div className="title-container">
          <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
        </div>
        <div className="content-container">
          <textarea id="post-text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="what's your message?" />
        </div>
        <button id="submit-button" onClick={onClick}>SUBMIT POST</button>
        <h4 id="error-message">{error}</h4>
      </div>
      <img id="pic" src={pic} alt="pic" />
    </div>
  );
};

export default Post;
