import React from 'react';
import axios from 'axios';
import './search.css';

const SearchFeedEntry = ({ show, onClick }) => {
  const getSummary = () => {
    let summary = show.summary.replace(/<p>|<\/p>/g, '');
    const output = [];
    while (summary.length > 0) {
      if (summary.search(/<i>/) !== -1) {
        output.push(summary.slice(0, summary.search(/<i>/)));
        summary = summary.slice(summary.search(/<i>/) + 3);

        const italic = summary.slice(0, summary.search(/<\/i/));
        output.push(<i key={italic + summary.search(/<i>/)}>{italic}</i>);
        summary = summary.slice(summary.search(/<\/i>/) + 4);
      } else if (summary.search(/<b>/) !== -1) {
        output.push(summary.slice(0, summary.search(/<b>/)));
        summary = summary.slice(summary.search(/<b>/) + 3);

        const bold = summary.slice(0, summary.search(/<\/b/));
        output.push(<b key={bold + summary.search(/<b>/)}>{bold}</b>);
        summary = summary.slice(summary.search(/<\/b>/) + 4);
      } else {
        output.push(summary);
        summary = '';
      }
    }

    return output;
  };

  const getImage = () => {
    if (show.image !== null) {
      return show.image.medium;
    }
  };

  return (
    <div className="show-card">
      <div style={{ color: 'white' }} value={show.id} onClick={() => onClick(show)}>
        <h3 className="show-name">{show.name}</h3>
        <div className="show-summary">{getSummary()}</div>
        <img className="show-img" src={getImage()} alt="" />
      </div>
    </div>
  );
};

export default SearchFeedEntry;
