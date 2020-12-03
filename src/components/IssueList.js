import React from 'react';
import PropTypes from 'prop-types';
import Issue from './Issue';

export default function IssueList({ issues }) {
  return (
    <ul className="issues">
      {issues.map(issue =>
        <li key={issue.id}>
          <Issue
            number={issue.number}
            title={issue.title}
            summary={issue.body}
          />
        </li>
      )}
    </ul>
  );
}

IssueList.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      user: PropTypes.shape({
        login: PropTypes.string
      }).isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
    }))
  };