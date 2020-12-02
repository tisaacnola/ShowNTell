/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import './dms.css';

const Messages = (props = {}) => {
  const [content, setContent] = useState();
  const { id, messages, setUser } = props;
  let message;
  if (messages) {
    messages.forEach((data) => {
      if (data.id === id) {
        message = data;
      }
    });
  }
  return (
    <div>
      <div className="message-content">
        {
        message
          ? message.text.map((data) => (
            <div key={data.message}>
              <h2>{data.name}</h2>
              <div>{data.message}</div>
            </div>
          )) : null
        }
      </div>
      <h3>send a new message:</h3>
      <input className="write-message-box" placeholder="new message" onChange={(e) => setContent(e.target.value)} />
      <button
        className="send-message-button"
        onClick={() => {
          axios.put(`/sendMessage/${id}/${content}`)
            .then(() => {
              axios.get('/user')
                .then((result) => setUser(result.data));
            });
        }}
      >
        send
      </button>
    </div>
  );
};

export default Messages;
