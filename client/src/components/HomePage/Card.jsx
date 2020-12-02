import React from 'react';
import './Card.css';
import { FaGithub } from 'react-icons/fa';

function Card({ icon, imageUrl, body }) {
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&family=Nunito&display=swap" rel="stylesheet" />;
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />;
    return (
      <div className="card-container">
        <div className="card-content">
          <div className="card-icon">
            <h1>{icon}</h1>
          </div>
          <div className="card-body">
            <p>{body}</p>
          </div>
        </div>
      </div>
    );
}

export default Card;
