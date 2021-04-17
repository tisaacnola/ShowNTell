// Import React, hook functions, axios, and requisite components.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create functional component, receiving show id.
const SearchCastAndCrew = ({ show }) => {
  // Generate hooks for cast, crew.
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  // Create variable to be used for conditional rendering.
  const [conditional, setConditional] = useState(false);
  // Create id variable from show object.
  const showId = show.id;
  console.log('ShowID:', showId);

  // Function which makes call to API endpoint using showId, retrieving cast.
  const getCast = () => {
    axios.get(`http://api.tvmaze.com/shows/${showId}/cast`)
      .then((response) => {
        // Extract data from response.
        const { data } = response;
        // Map over data, generating an array of cast and character names.
        const castNames = data.map((element) => (
          <div>
            <div>
              {`${element.person.name} as ${element.character.name}`}
            </div>
            <br />
          </div>
        ));
        // Now set state of cast to be the above array.
        setCast(castNames);
      });
  };

  // Function which makes call to API endpoint using showId, retrieving crew.
  const getCrew = () => {
    axios.get(`http://api.tvmaze.com/shows/${showId}/crew`)
      .then((response) => {
        // Extract data from response.
        const { data } = response;
        // Map over data, generating an array of crew names and titles.
        const crewNames = data.map((element) => (
          <div>
            <div>
              {`${element.type}:
            ${element.person.name}`}
            </div>
            <br />
          </div>
        ));
        // Now set state of crew to be the above array.
        setCrew(crewNames);
      });
  };

  return (
    <div>
      <button
        className="summary-button"
        onClick={(event) => {
          // Change here - getCast, getCrew functions.
          event.stopPropagation();
          setConditional(!conditional);
          getCast();
          getCrew();
        }}
      >
        show cast & crew
      </button>
      {(conditional === true) ? (
        <div className="show-summary">
          <div className="show-name">Cast</div>
          <div>{cast.length ? cast : 'No cast information'}</div>
          <div className="show-name">Crew</div>
          <div>{crew.length ? crew : 'No crew information'}</div>
        </div>
      )
        : null}
    </div>
  );
};

export default SearchCastAndCrew;
