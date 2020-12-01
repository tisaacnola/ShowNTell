/* eslint-disable import/extensions */
/* eslint-disable max-len */
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
      { messages ? <Messages id={messages} messages={user.messages} />
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
                    {Users.map(({ name, id }) => {
                      if (user.id === id) {
                        return null;
                      }
                      if (find) {
                        return name.toLowerCase().includes(find.toLowerCase()) ? (
                          <h4
                            key={String(id)}
                            onClick={() => {
                              for (let i = 0; i < user.messages.length; i += 1) {
                                if (user.messages[i].id === String(id)) {
                                  return setMessages(String(id));
                                }
                              }
                              axios.put(`/startMessage/${id}/${name}`)
                                .then(() => setMessages(String(id)));
                            }}
                          >
                            {name}
                          </h4>
                        ) : null;
                      }
                      return (
                        <h4
                          key={String(id)}
                          onClick={() => {
                            for (let i = 0; i < user.messages.length; i += 1) {
                              if (user.messages[i].id === String(id)) {
                                return setMessages(String(id));
                              }
                            }
                            axios.put(`/startMessage/${id}/${name}`)
                              .then(() => setMessages(String(id)));
                          }}
                        >
                          {name}
                        </h4>
                      );
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
              {
              user.messages.map((({ id, name }) => (<h1 key={String(id)} onClick={() => setMessages(String(id))}>{name}</h1>)))
              }
            </div>
          </div>
        )}
    </div>
  );
};

export default DMs;
