import React, { useState } from 'react';
import axios from 'axios';
import Following from './following.jsx';
import './friendlist.css';

const FriendList = (props = {}) => {
  const { user, users, setUser } = props;
  const friends = [];
  const following = [];
  const followers = [];
  let isFollower;
  let isFriend;
  user.following.forEach((person) => {
    isFollower = false;
    users.forEach((follower) => {
      if (person._id === follower._id) {
        isFollower = true;
        friends.push(person);
      }
    });
    if (!isFollower) {
      following.push(person);
    }
  });

  users.forEach((follower) => {
    isFriend = false;
    user.following.forEach((followed) => {
      if (follower._id === followed._id) {
        isFriend = true;
      }
    });
    if (!isFriend) {
      followers.push(follower);
    }
  });

  return (
    <div className="row">
      <div className="column">
        <h1 id="header">Friends</h1>
        <Following followingList={friends} user={user} setUser={setUser} />
      </div>
      <div className="column">
        <h1 id="header">Following</h1>
        <Following followingList={following} user={user} setUser={setUser} />
      </div>
      <div className="column">
        <h1 id="header">Followers</h1>
        <Following followingList={followers} user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default FriendList;
