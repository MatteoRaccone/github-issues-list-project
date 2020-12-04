import React from 'react';
import PropTypes from 'prop-types';
import './Issue.css';
import Octicon, { comment } from 'octicons-react';

function shorten(text = "", length = 140) {
  let cleanText = text.replace(/\\r\\n/g, "\\n");
  if(cleanText.length <= length) {
    return cleanText;
  }

  return cleanText.substr(0, 140);
}

export default function Issue({ number, title, summary, user, created_at, comments}) {
  return (
    <div>
      <div className="issue-container container">
        <div className="p-3">
          <div class="d-flex row position-relative">
            <div class=" px-0 col-9">
              <a href="#" className="issue-title">{title}</a>
              <div className="issue-summary">{shorten(summary)}</div>
              <div className="issue-number">#{number}  created by {user} the {created_at}</div>
            </div>
            <div class="flex-shrink-0 col-3 pt-2 text-right pr-3 no-wrap hide-sm">
              <span>
                <Octicon className="comment-icon" icon={comment} />
                <span class="comment-number">{comments}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired
};