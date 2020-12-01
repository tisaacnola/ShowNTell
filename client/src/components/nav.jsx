/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaStar, FaPen, FaBell, FaEnvelope, FaSearch, FaDoorOpen } from 'react-icons/fa';
import HomePage from './HomePage/HomePage.jsx';
import DMs from './dms.jsx';
import Notifs from './notifs.jsx';
import logo from './HomePage/img/logo.jpg';

const Nav = ({ user, onClick, logout }) => {
  const [page, setPage] = useState('home');
  return (
    <div>
      <div onClick={(e) => {
        if (e.target.className === 'views') {
          onClick(e.target.value);
        }
      }}
      >
        <FaHome  value="home" className="views"/>
        <button value="sub" className="views">
          list of subs
        </button>
        <button value="post" className="views">
          post
        </button>
        <button value="notifs" className="views">
          notifs
        </button>
        <button value="DMs" className="views">
          DMs
        </button>
        <input />
        <button onClick={logout}>logout</button>
      </div>

      <div>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet" />
        <img id="homeButton" src={logo} alt="logo" onClick={() => { console.log('hey'); setPage('home'); }} />
        <ul className="navbar" onClick={(e) => {
        if (e.target.className === 'views') {
          onClick(e.target.value);
        }
      }}>
          <li value="home" className="views" title="home feed" >
            {' '}
            <FaHome />
            {' '}
          </li>
          <li value="sub" className="views" title="subscriptions">
            {' '}
            <FaStar />
          </li>
          <li title="create a post">
            {' '}
            <FaPen />
            {' '}
          </li>
          <li title="notifications" id={(page === 'notifs') ? 'icon' : null} onClick={() => setPage('notifs')}>
            <FaBell />
            {' '}
          </li>
          <li title="messages" id={(page === 'DMs') ? 'icon' : null} onClick={() => setPage('DMs')}>
            <FaEnvelope />
            {' '}
          </li>
          <li title="log out" onClick={() => axios.get('/logout')}><FaDoorOpen /></li>
          <li>
            {' '}
            <div className="wrap">
              <div className="search">
                <input type="text" className="search-term" placeholder="What are you watching?" />
                <button type="submit" className="search-button">
                  <i className="FaSearch" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
