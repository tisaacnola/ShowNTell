/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';

class FollowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subs: [],
    };
    this.getSubs = this.getSubs.bind(this);
  }

  componentDidMount() {
    this.setState({ subs: this.props.friend.subscriptions });
    this.getSubs();
  }

  getSubs() {
    console.log(this.state.subs);
    const promises = this.props.friend.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
    Promise.all(promises)
      .then((results) => results.map((show) => show.data))
      .then((shows) => {
        console.log(shows);
      })
      .catch();
  }

  render() {
    const { friend } = this.props;
    return (
      <div>

        <h3 id="dms-sub-header">{ friend.name }</h3>
      </div>
    );
  }
}

export default FollowItem;
