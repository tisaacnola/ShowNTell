/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import Messages from './messages.jsx';

const DMs = ({ user }) => {
  const [messages, setMessages] = useState();
  const [Users, setUsers] = useState();
  const [find, setfind] = useState();
  return (
    <div>
      { messages ? <Messages />
        : (
          <div>
            <h1>Direct Messages</h1>
            <div>
              {
              Users ? (
                <div>
                  <input
                    onChange={(e) => {
                      setfind(e.target.value);
                    }}
                    placeholder="search for a user"
                  />
                  <div>
                    {Users.map(({ name }) => {
                      if (find) {
                        return name.includes(find) ? (<h4>{name}</h4>) : null;
                      }
                      return (<h4>{name}</h4>);
                    })}
                  </div>
                  <div />
                </div>
              )
                : (
                  <button onClick={() => {
                    axios.get('/findUser')
                      .then(({ data }) => setUsers(data))
                      .catch();
                  }}
                  >
                    Start DMs
                  </button>
                )
            }
            </div>
            <div>
              <h1 onClick={() => setMessages('billy')}>user 1</h1>
            </div>
            <div>
              <h1 onClick={() => setMessages('billy')}>user 2</h1>
            </div>
            <div>
              <h1 onClick={() => setMessages('billy')}>user 3</h1>
            </div>
          </div>
        )}
    </div>
  );
};

export default DMs;
