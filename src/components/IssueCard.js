import React from 'react';
import PropTypes from 'prop-types';
import './Issue.css';
import Octicon, { comment } from 'octicons-react';
import opened from '../containers/opened.svg';

function shorten(text = "", length = 140) {
  let cleanText = text.replace(/\\r\\n/g, "\\n");
  if(cleanText.length <= length) {
    return cleanText;
  }

  return cleanText.substr(0, 140);
}

export default function Issue({ number, title, summary, user, created_at, comments, state, labels}) {
  return (
    <div>
      <div className="issue-container container">
        <div className="p-3">
          <div className="d-flex row position-relative">
            <div className=" px-0 col-9">
              <span className="opened"><img src={opened} alt="opened" /></span>
              <a href="#" className="issue-title">{title}</a>
              <div className="issue-summary">{shorten(summary)}</div>
              <div className="issue-number">#{number}  created by {user} the {created_at}</div>
            </div>
            <div className="flex-shrink-0 col-3 pt-2 text-right pr-3 no-wrap hide-sm">
              <span>
                <Octicon className="comment-icon" icon={comment} />
                <span className="comment-number">{comments}</span>
              </span>
            </div>
          </div>
          <div className="issue-labels">
            {labels.map(label =>
              <span
                key={label.id}
                className="issue-label"
                style={{borderColor: `#${label.color}`}}>
                {label.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Issue.propTypes = {
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
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    }))
  }))
};