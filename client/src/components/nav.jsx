/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { FaHome, FaStar, FaPen, FaBell, FaEnvelope, FaSearch, FaDoorOpen } from 'react-icons/fa';
import logo from './HomePage/img/logo1.png';

const Nav = ({ user, onClick, logout, search, setSearch, onSearch }) => (
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />
    <img
      id="homeButton"
      src={logo}
      alt="logo"
      onClick={() => onClick('homePage')}
      className="views"
      title="home feed"
    />
    <ul className="navbar">
      <li onClick={() => onClick('home')} id="home-icon" className="views" title="home feed">
        <FaHome />
        {/* <p id="home-icon-hover">home</p> */}
        {' '}
      </li>
      <li onClick={() => onClick('sub')} className="views" title="subscriptions">
        {' '}
        <FaStar />
      </li>
      <li onClick={() => onClick('post')} className="views" title="create a post">
        {' '}
        <FaPen />
        {' '}
      </li>
      <li onClick={() => onClick('notifs')} className="views" title="notifications">
        <FaBell />
        {' '}
      </li>
      <li onClick={() => onClick('DMs')} className="views" title="messages">
        <FaEnvelope />
        {' '}
      </li>
      <li onClick={logout} title="log out"><FaDoorOpen /></li>
      <li>
        {' '}
        <div className="wrap">
          <div className="search">
            <input
              type="text"
              className="search-term"
              placeholder="what are you watching?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
            />
            <FaSearch
              type="submit"
              className="srch-button"
              onClick={onSearch}
            >
              <i className="search-icon" />
            </FaSearch>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default Nav;
