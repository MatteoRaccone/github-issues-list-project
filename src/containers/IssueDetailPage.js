import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { getIssue, getComments } from '../redux/actions';
import { connect } from 'react-redux';
import { Breadcrumb } from 'react-bootstrap';
import Octicon, { issueOpened } from 'octicons-react';
import rep from './rep.png';
import './Comment.css';
import UserWithAvatar from '../components/UserWithAvatar';
import IssueLabels from '../components/IssueLabels';
import ReactMarkdown from 'react-markdown';

function Comment({ comment }) {
  return (
    <div className="row">
      <div className="col-1 text-center">
        <UserWithAvatar user={comment.user} orientation="horizontal"/>
      </div>
      <div className="col-12 col-md-11 mb-4 mb-md-0">
        <div className="issue-summary-header container">
          <div className="row">
            <span className="author col-9">{comment.user.login}
            <span className="ml-2 date-comment">commented on {comment.created_at}</span>
            </span>
            <span>{comment.author_association === 'NONE'
            ? <div></div>
            : <span className="association text-lowercase">{comment.author_association}</span>}</span>
          </div>
        </div>
        <div className="issue-detail-summary container">
          <ReactMarkdown className="markdown" source={comment.body}/>
        </div>
        <hr className="divider-short"/>
      </div>
    </div>
  );
}

function IssueComments({ comments = [] }) {
  return (
    <ul className="issue-detail-comments">
      {comments.map(comment =>
        <li key={comment.id}>
          <Comment comment={comment}/>
        </li>
      )}
    </ul>
  );
}

const IssueState = ({ issue: {state} }) => (
  <span className={`issue-detail-state issue-detail-state-${state}`}>
    <Octicon className="mr-1" icon={issueOpened} />
    {state}
  </span>
);

const IssueNumber = ({ issue }) => (
  <span className="issue-detail-number ml-2">
    #{issue.number}
  </span>
);

export function insertMentionLinks(markdown) {
  return markdown.replace(/\B(@([a-zA-Z0-9](-?[a-zA-Z0-9_])+))/g, `[$1](https://github.com/$2)`);
}

class IssueDetails extends Component {
  componentDidMount() {
    if(!this.props.issue) {
      this.props.getIssue();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.issue !== this.props.issue) {
      this.props.getComments(newProps.issue);
    }
  }
  

  renderContent() {
    const {issue, comments, labels} = this.props;

    return (
      <>
      <Breadcrumb className ="sub-header">
        <span><img src={rep} alt="rep" className="repo-icon"/></span>
          <Breadcrumb.Item href="#">Facebok</Breadcrumb.Item>
          <Breadcrumb.Item active href="#">React</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issue-detail container">
        <h1 className="issue-detail-title">{issue.title}
        <span><IssueNumber issue={issue}/></span></h1>
        <div className="issue-detail-meta">
          <IssueState issue={issue}/><span>{issue.comments} comments</span>
        </div>
        <div className="row">
        <div className="col-1 text-center">
        <UserWithAvatar user={issue.user} orientation="horizontal"/>
        </div>
          <div className="col-12 col-md-8 mb-4 mb-md-0">
            <div className="issue-summary-header container">
              <span className="author">{issue.user.login}</span>
              <span className="ml-2 date-comment">commented on {issue.created_at}</span>
            </div>
            <div className="issue-detail-summary container">
              <ReactMarkdown className="markdown" source={issue.body}/>
            </div>
            <hr className="divider-short"/>
            {issue.comments === 0
            ? <div>No comments</div>
            : <IssueComments comments={comments}/>}
          </div>
          <div className="col-3">
            <div className="issue-right-panel">
              <p>Assignees</p>
            </div>
            <div className="issue-right-panel">
              <p>Labels</p>
              <IssueLabels labels={issue.labels}/>
            </div>
            <div className="issue-right-panel">
              <p>Projects</p>
            </div>
            <div className="issue-right-panel">
              <p>Milestone</p>
            </div>
            <div className="issue-right-panel">
              <p>Linked pull requests</p>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  

  renderLoading() {
    return (
      <div>
        Loading issue {this.props.match.params.issueId}...
      </div>
    );
  }

  render() {
    const {issue} = this.props;

    return (
      <div>
        {issue && this.renderContent()}
        {!issue && this.renderLoading()}
      </div>
    );
  }
}

IssueDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      issueId: PropTypes.string.isRequired
    })
  }),
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string
  })).isRequired
}

const mapState = ({ issues, issueComments }, ownProps) => {
  const issueNum = ownProps.match.params.issueId;
  return {
    issue: issues.issuesByNumber[issueNum],
    comments: issueComments[issueNum]
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  getIssue: () => dispatch(getIssue('facebook', 'react', ownProps.match.params.issueId)),
  getComments: (issue) => {
    return dispatch(getComments(issue));
  }
});

export default connect(mapState, mapDispatch)(IssueDetails);