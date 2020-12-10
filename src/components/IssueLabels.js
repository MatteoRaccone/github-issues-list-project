import React from 'react';
import PropTypes from 'prop-types';

const IssueLabels = ({ labels }) => (
  <div className="issue-labels">
    {labels.map(label =>
      <span
        key={label.id}
        className="issue-label"
        style={{backgroundColor: `#${label.color}`}}>
        {label.name}
      </span>
    )}
  </div>
);

IssueLabels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string
  })).isRequired
};

export default IssueLabels;