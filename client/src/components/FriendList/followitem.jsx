/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';

class FollowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subs: [],
      showSubs: [],
      movies: [],
      showMovies: [],
    };
    this.getSubs = this.getSubs.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.subscribeShow = this.subscribeShow.bind(this);
    this.subscribeMovie = this.subscribeMovie.bind(this);
  }

  componentDidMount() {
    this.setState({ subs: this.props.friend.subscriptions });
    this.setState({ movies: this.props.friend.movieSubscriptions });
    this.getSubs();
    this.getMovies();
  }

  getSubs() {
    console.log(this.state.subs);
    const promises = this.props.friend.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
    Promise.all(promises)
      .then((results) => results.map((show) => show.data))
      .then((shows) => {
        this.setState({ showSubs: shows });
      })
      .catch();
  }

  getMovies() {
    console.log(this.props.friend.movieSubscriptions);
    const promises = this.props.friend.movieSubscriptions.map((movieId) => axios.get(`movie/${movieId}`).catch());
    Promise.all(promises)
      .then((results) => results.map((movie) => movie.data))
      .then((movies) => {
        this.setState({ showMovies: movies });
      })
      .catch();
  }

  subscribeShow(id) {
    console.log(id);
    axios.put(`/subscribe/${id}`)
      .then(() => axios.get('/user').then(({ data }) => this.props.setUser(data)))
      .catch();
  }

  subscribeMovie(id) {
    console.log(id);
    axios.put(`/subscribeMovie/${id}`)
      .then(() => axios.get('/user').then(({ data }) => this.props.setUser(data)))
      .catch();
  }

  render() {
    const { friend } = this.props;
    const { showSubs, showMovies } = this.state;
    return (
      <div>
        <h3 id="dms-sub-header">{ friend.name }</h3>
        { showSubs.map((show) => <span id={show.id} className="show" title="subscribe" onClick={() => { this.subscribeShow(show.id); }}><small><i>{show.name}</i></small></span>) }
        { showMovies.map((show) => <span id={show._id} className="show" title="subscribe" onClick={() => { this.subscribeMovie(show.id); }}><small><i>{show.title}</i></small></span>) }
      </div>
    );
  }
}

export default FollowItem;
