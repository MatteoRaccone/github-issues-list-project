import React from 'react';
import PropTypes from 'prop-types';
import Issue from './IssueCard';
import { Link } from 'react-router-dom';

export default function IssueList({ issues }) {
  return (
    <ul className="issues">
      {issues.map(issue =>
        <li key={issue.id} className="issues-list">
        <Link to={`/issue/${issue.number}`} className="issue-link" style={{ textDecoration: 'none' }}>
          <Issue
            number={issue.number}
            title={issue.title}
            summary={issue.body}
            user={issue.user.login}
            created_at= {issue.created_at}
            comments= {issue.comments}
            state= {issue.state}
            labels= {issue.labels}
          />
        </Link>
        </li>
      )}
    </ul>
  );
}

IssueList.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      user: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }).isRequired,
      state: PropTypes.string,
      title: PropTypes.string,
      created_at: PropTypes.string,
      comments: PropTypes.number,
      body: PropTypes.string,
      labels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
      }))
    }))
  };