/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';

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
      <div>
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
      <input placeholder="write a message" onChange={(e) => setContent(e.target.value)} />
      <button onClick={() => {
        axios.put(`/sendMessage/${id}/${content}`)
          .then(() => {
            axios.get('/user')
              .then((result) => setUser(result.data));
          });
      }}
      >
        send message
      </button>
    </div>
  );
};

export default Messages;
