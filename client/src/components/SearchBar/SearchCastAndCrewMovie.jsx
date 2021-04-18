// Import React, hook functions, axios, and requisite components.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create functional component, receiving movie id.
const SearchCastAndCrewMovie = ({ movie }) => {
  // Generate hooks for cast, crew.
  const [castMovie, setCastMovie] = useState([]);
  const [crewMovie, setCrewMovie] = useState([]);
  // Create variable to be used for conditional rendering.
  const [conditional, setConditional] = useState(false);
  // Create id variable from show object.
  const movieId = movie.id;
  // Function which makes call to API endpoint using movieId, retrieving cast.
  const getCastMovie = () => {
    // axios.get(`http://api.tvmaze.com/shows/${showId}/cast`)

    // https://api.themoviedb.org/3/movie/457335/credits?api_key=bde28fb08435e87e8ee72260cc57ce13&language=en-US&page=1&include_adult=false

    // axios.get(`/cast/${movieId}`)
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bde28fb08435e87e8ee72260cc57ce13&language=en-US&page=1`)
      .then((response) => {
        // console.log(response);
        // Extract cast from response.data.
        const { cast } = response.data;
        // Map over cast, generating an array of cast and character names.
        const castNames = cast.map((element) => (
          <div>
            <div>
              {`${element.name} as ${element.character}`}
            </div>
            <br />
          </div>
        ));
        // Now set state of cast to be the above array.
        setCastMovie(castNames);
      });
  };

  // Function which makes call to API endpoint using movieId, retrieving crew.
  const getCrewMovie = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bde28fb08435e87e8ee72260cc57ce13&language=en-US&page=1`)
      .then((response) => {
        // Extract crew from response.data.
        const { crew } = response.data;
        // Map over crew, generating an array of crew names and titles.
        const crewNames = crew.map((element) => (
          <div>
            <div>
              {`${element.job}:
            ${element.name}`}
            </div>
            <br />
          </div>
        ));
        // Now set state of crew to be the above array.
        setCrewMovie(crewNames);
      });
  };

  return (
    <div>
      <button
        className="summary-button"
        onClick={(event) => {
          event.stopPropagation();
          setConditional(!conditional);
          getCastMovie();
          getCrewMovie();
        }}
      >
        show cast & crew
      </button>
      {(conditional === true) ? (
        <div className="show-summary">
          <div className="show-name">Cast</div>
          <div>{castMovie.length ? castMovie : 'No cast information'}</div>
          <div className="show-name">Crew</div>
          <div>{crewMovie.length ? crewMovie : 'No crew information'}</div>
        </div>
      )
        : null}
    </div>
  );
};

export default SearchCastAndCrewMovie;
