import React, { useState } from 'react';
import axios from 'axios';
import Following from './following.jsx';
import Followers from './followers.jsx';

const FriendList = (props = {}) => {
  const { user, users } = props;
  // console.log(users);
  // const getFollowers = () => {
  //   const buildFollowers = [];
  //   axios.get('/users')
  //     .then((result) => {
  //       const people = result.data;
  //       people.forEach((person) => {
  //         if (person.following) {
  //           person.following.forEach((follow) => {
  //             if (follow._id === user._id) {
  //               buildFollowers.push(person);
  //             }
  //           });
  //         }
  //       });
  //       console.log('hello from app');
  //       console.log(buildFollowers);
  //       return buildFollowers;
  //     });
  // };
  // const [followers, setFollowers] = useState(getFollowers());

  return (
    <div>
      <h1 id="header">Following</h1>
      <Following followingList={user.following} />
      <h1 id="header">Followers</h1>
      <Followers followingList={users} />
      <h1 id="header">Friends</h1>
    </div>
  );
};

export default FriendList;
