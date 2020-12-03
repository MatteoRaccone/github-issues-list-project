import React from 'react';
import PropTypes from 'prop-types';
import './Issue.css';

function shorten(text = "", length = 140) {
  // Normalize newlines
  let cleanText = text.replace(/\\r\\n/g, "\\n");

  // Return if short enough already
  if(cleanText.length <= length) {
    return cleanText;
  }

  return cleanText.substr(0, 140);
}

export default function Issue({ number, title, summary }) {
  return (
    <div className="issue container">
      <div>
        <div>
          <span className="issue__title">{title}</span>
        </div>
        <p className="issue__summary">{shorten(summary)}</p>
        <p className="issue__number">#{number}</p>
      </div>
    </div>
  );
}

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired
};