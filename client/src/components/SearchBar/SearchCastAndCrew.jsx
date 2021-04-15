// Import React, hook functions, axios, and requisite components.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create functional component, receiving show id.
const SearchCastAndCrew = ({ show }) => {
  // Generate hooks for cast, crew.
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  // Create id variable from show object.
  const showId = show.id;

  // Function which makes call to API endpoint using showId, retrieving cast.
  const getCast = () => {
    axios.get(`http://api.tvmaze.com/shows/${showId}/cast`)
      .then((response) => {
        // Extract data from response.
        const { data } = response;
        // Map over data, generating an array of cast and character names.
        const castNames = data.map((element) => {
          return element.person.name;
        });
        // Now set state of cast to be the above array. ***note: change to hooks!
        // this.setState({
        //   cast: castNames,
        // });
      });
    // Use hooks here and return the created array.
  };

  // Function which makes call to API endpoint using showId, retrieving crew.
  const getCrew = () => {
    axios.get(`http://api.tvmaze.com/shows/${showId}/crew`)
      .then((response) => {
        // Extract data from response.
        const { data } = response;
        // Map over data, generating an array of crew names and titles.
        const crewNames = data.map((element) => {
          return element.person.name;
        });
        // Now set state of cast to be the above array. ***note: change to hooks!
        // this.setState({
        //   crew: crewNames,
        // });
      });
    // Use hooks here and return the created array.
  };

  return (
    <button
      className="summary-button"
      onClick={(event) => {
        // Change here - getCast, getCrew functions.
        event.stopPropagation();
        // setState(getSummary());
      }}
    >
      show cast & crew
    </button>
  );
};

export default SearchCastAndCrew;
