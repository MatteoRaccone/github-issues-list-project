import React from 'react';
import PropTypes from 'prop-types';
import Issue from './IssueCard';

export default function IssueList({ issues }) {
  return (
    <ul className="issues">
      {issues.map(issue =>
        <li key={issue.id}>
          <Issue
            number={issue.number}
            title={issue.title}
            summary={issue.body}
            user={issue.user.login}
            created_at= {issue.created_at}
            comments= {issue.comments}
            state= {issue.state}
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
      state: PropTypes.string,
      title: PropTypes.string,
      created_at: PropTypes.string,
      comments: PropTypes.number,
      body: PropTypes.string,
    }))
  };