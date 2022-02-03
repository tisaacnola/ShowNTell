// Import React, hook functions, axios, and requisite components.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create functional component, receiving show id.
const SearchCastAndCrew = ({ show }) => {
  // Generate hooks for cast, crew.
  const [castTV, setCastTV] = useState([]);
  const [crewTV, setCrewTV] = useState([]);
  // Create variable to be used for conditional rendering.
  const [conditional, setConditional] = useState(false);
  // Create id variable from show object.
  const showId = show.id;
  // console.log(showId);
  // Function which makes call to API endpoint using showId, retrieving cast.
  const getCastTV = () => {
    // axios.get(`http://api.tvmaze.com/shows/${showId}/cast`)
    axios.get(`/cast/${showId}`)
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
        setCastTV(castNames);
      });
  };

  // Function which makes call to API endpoint using showId, retrieving crew.
  const getCrewTV = () => {
    // axios.get(`http://api.tvmaze.com/shows/${showId}/crew`)
    axios.get(`/crew/${showId}`)
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
        setCrewTV(crewNames);
      });
  };

  return (
    <div>
      <button
        className="cast-crew"
        onClick={(event) => {
          event.stopPropagation();
          setConditional(!conditional);
          getCastTV();
          getCrewTV();
        }}
      >
        show cast & crew
      </button>
      {(conditional === true) ? (
        <div className="show-summary">
          <div className="show-name">Cast</div>
          <div>{castTV.length ? castTV : '---'}</div>
          <div className="show-name">Crew</div>
          <div>{crewTV.length ? crewTV : '---'}</div>
        </div>
      )
        : null}
    </div>
  );
};

export default SearchCastAndCrew;
