/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage/HomePage.jsx';
import Nav from './nav.jsx';
import HomeFeed from './HomeFeed/homeFeed.jsx';

import RecommendedBoth from './Subscriptions/RecommendedBoth.jsx';

import Sub from './Subscriptions/sub.jsx';
import Post from './CreatePost/post.jsx';
import DMs from './DMs/dms.jsx';
import Notifs from './Notifications/notifs.jsx';
import SearchFeed from './SearchBar/searchFeed.jsx';
import ShowFeed from './Subscriptions/showFeed.jsx';
import MovieFeed from './Subscriptions/MovieFeed.jsx';
import FriendList from './FriendList/friendList.jsx';

const App = () => {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  const [view, setView] = useState('homePage');
  const [movieId, setMovieId] = useState('');
  const [showId, setShowId] = useState('');
  const [search, setSearch] = useState('');
  const [searchedShows, setSearchedShows] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [userClicked, setUsersClicked] = useState(false);
  const [test, setTest] = useState(false);
  // const [subs, setSubs] = useState([]);
  // const [movieSubs, setMovieSubs] = useState([]);

  // const [recommendedTV, setRecommendedTV] = useState([]);

  const changeView = (newView) => {
    setView(newView);
  };

  // ?? //
  // ** //
  // !! //
  // !! //
  // ** //
  // ?? //

  // const passSubs = (userSubs, userMovieSubs) => {
  //   setSubs(userSubs);
  //   setMovieSubs(userMovieSubs);
  //   console.log(userSubs, movieSubs);
  // };

  // ?? //
  // ** //
  // !! //
  // !! //
  // ** //
  // ?? //

  const getUser = () => {
    if (!user) {
      axios
        .get('/user')
        .then(({ data }) => setUser(data))
        .then(() => setTest(true))
        .catch();
    } else if (test) {
      changeView('home');
      setTest(false);
    }
  };

  const getPosts = () => {
    if (!posts && user) {
    // if (!userClicked) {
    //   executed = !executed;
      axios
        .get('/posts')
        .then(({ data }) => {
          setPosts(data);
        })
        .catch();
    }
    // }
  };

  const logout = () => {
    axios.get('/logout').then(() => {
      setView('homePage');
      setUser(null);
      setPosts(null);
    });
  };

  const createPost = (post) => {
    axios
      .post('/posts', post)
      .then(() => setView('home'))
      .then(() => axios.get('/user').then(({ data }) => setUser(data)))
      .then(() => axios.get('/posts').then(({ data }) => setPosts(data)))
      .catch();
  };

  const searchShows = () => {
    axios.get(`/search/${search}`).then(({ data }) => {
      setView('Shows');
      setSearch('');
      setSearchedShows(data);
    }).catch();
  };
  const searchMovies = () => {
    axios.get(`/search/movies/${search}`).then(({ data }) => {
      setView('Movies');
      setSearch('');
      setSearchedMovies(data.results);
    }).catch((err) => { console.log(err); });
  };

  const handleUserClick = (e) => {
    setUsersClicked(!userClicked);
    const usersName = e.target.innerHTML;
    axios.get(`/user/posts/${usersName}`).then(({ data }) => {
      // console.log('TESTING', data);
      setPosts(data);
    });
  };

  const handleShowFeed = () => {
    setUsersClicked(!userClicked);
    getPosts();
  };

  const addShow = (show) => {
    axios.get(`/show/${show.id}`)
      .then(({ data }) => { setView('showFeed'); setShowId(data.id); })
      .catch();
  };
  const addMovie = (movie) => {
    axios.get(`/movie/${movie.id}`)
      .then(({ data }) => { setView('movieFeed'); setMovieId(data.id); })
      .catch();
  };

  const subscribe = (showId) => {
    axios.put(`/subscribe/${showId}`)
      .then(() => axios.get('/user').then(({ data }) => setUser(data)))
      .catch();
  };
  const subscribeMovie = (movieId) => {
    // make a new endpoint in index.js for subscriptions, line 287
    axios.put(`/subscribeMovie/${movieId}`)
      .then(() => axios.get('/user').then(({ data }) => setUser(data)))
      .catch();
  };

  const searchViewSwitcher = () => {
    if (view === 'Shows') {
      changeView('Movies');
    } else if (view === 'Movies') {
      changeView('Shows');
    }
  };
  const getView = () => {
    if (view === 'homePage') {
      return <HomePage />;
    }
    if (view === 'sub') {
      return <Sub user={user} setView={setView} />;
    }
    if (view === 'recommendedBoth') {
      return <RecommendedBoth user={user} />;
    }
    if (view === 'post') {
      return <Post user={user} createPost={createPost} />;
    }
    if (view === 'home') {
      return <HomeFeed handleUserClick={handleUserClick} user={user} setUser={setUser} posts={posts} setPosts={setPosts} />;
    }
    if (view === 'DMs') {
      return <DMs user={user} setUser={setUser} />;
    }
    if (view === 'notifs') {
      return <Notifs user={user} setUser={setUser} />;
    }
    if (view === 'search' || view === 'Shows' || view === 'Movies') {
      return (
        <SearchFeed
          shows={searchedShows}
          movies={searchedMovies}
          addShow={addShow}
          addMovie={addMovie}
          view={view}
          searchViewSwitcher={searchViewSwitcher}
          // onClick={() => {
          //   addShow();
          //   addMovie();
          // }}
        />
      );
    }
    // To Do: Add Following View
    if (view === 'friends') {
      return <FriendList user={user} />;
    }
    if (view === 'showFeed') {
      return <ShowFeed showId={showId} subscribe={subscribe} />;
    }
    if (view === 'movieFeed') {
      return <MovieFeed movieId={movieId} subscribe={subscribeMovie} />;
    }
  };

  return (
    <div>
      {user
        ? (
          <Nav
            user={user}
            search={search}
            onClick={changeView}
            logout={logout}
            setSearch={setSearch}
            onSearch={searchShows}
            onSearchTwo={searchMovies}
          />
        )
        : (
          <a
            className="login-button"
            href="/auth/google"
            // onClick={() => axios.get('/auth/google').then(({ data }) => console.log(data))}
          >
            LOGIN WITH GOOGLE
          </a>
        )}
      {getUser()}
      {getPosts()}
      {getView()}
    </div>
  );
};

export default App;
