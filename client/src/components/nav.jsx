/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage/HomePage.jsx';
import DMs from './dms.jsx';
import Notifs from './notifs.jsx';
import logo from './HomePage/img/logo.jpg';
import { FaHome, FaStar, FaPen, FaBell, FaEnvelope, FaSearch, FaDoorOpen } from 'react-icons/fa';

const Nav = ({ user }) => {
  const [page, setPage] = useState('home');
  const loadBody = () => {
    if (page === 'home') {
      return <HomePage />;
    } if (page === 'DMs') {
      return <DMs user={user} />;
    } if (page === 'notifs') {
      return <Notifs />;
    }
  };

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"></link>
      <img id="homeButton" src={logo} alt="logo" onClick={() => { console.log('hey'); setPage('home'); }} />
      <ul className="navbar">
        <li title="home feed"> {<FaHome />}  </li>
        <li title="subscriptions"> {<FaStar />}</li>
        <li title="create a post"> {<FaPen />} </li>
        <li title="notifications" id={(page === 'notifs') ? 'icon' : null} onClick={() => setPage('notifs')}>{<FaBell />}  </li>
        <li title="messages" id={(page === 'DMs') ? 'icon' : null} onClick={() => setPage('DMs')}>{<FaEnvelope />}  </li>
        <li title="log out" onClick={() => axios.get('/logout')}>{<FaDoorOpen />}</li>
        <li> <div className="wrap">
              <div className="search">
                <input type="text" className="search-term" placeholder="What are you watching?"/>
                <button type="submit" className="search-button">
                  <i className="FaSearch" ></i>
                </button>
              </div>
            </div>
        </li>
      </ul>
      <div>{loadBody()}</div>
    </div>
  );
};

export default Nav;
