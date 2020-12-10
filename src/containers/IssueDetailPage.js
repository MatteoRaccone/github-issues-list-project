import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { getIssue, getComments } from '../redux/actions';
import { connect } from 'react-redux';
import { Breadcrumb } from 'react-bootstrap';
import Octicon, { issueOpened } from 'octicons-react';
import rep from './rep.png';
import UserWithAvatar from '../components/UserWithAvatar';

function Comment({ comment }) {
  return (
    <div class="row">
      <div className="col-1 text-center">
        <UserWithAvatar user={comment.user} orientation="horizontal"/>
      </div>
      <div className="col-12 col-md-11 mb-4 mb-md-0">
        <div className="issue-summary-header container">
          <span className="author">{comment.user.login}</span>
        </div>
        <div className="issue-detail-summary container">
          <span>{comment.body}</span>
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
    const {issue, comments} = this.props;

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
        <hr className="divider-short"/>
        <div className="flex-column flex-md-row d-flex">
        <div className="col-1 text-center">
        <UserWithAvatar user={issue.user} orientation="horizontal"/>
        </div>
          <div className="col-12 col-md-9 mb-4 mb-md-0">
            <div className="issue-summary-header container">
              <span className="author">{issue.user.login}</span>
            </div>
            <div className="issue-detail-summary container">
              {issue.body}
            </div>
            <hr className="divider-short"/>
            {issue.comments === 0
            ? <div>No comments</div>
            : <IssueComments comments={comments}/>}
          </div>
          <div className="col-3">
            <div className="issue-right-panel">
              <span>Assignees</span>
              <hr className="divider-short"/>
            </div>
            <div className="issue-right-panel">
              <span>Labels</span>
              <hr className="divider-short"/>
            </div>
            <div className="issue-right-panel">
              <span>Projects</span>
              <hr className="divider-short"/>
            </div>
            <div className="issue-right-panel">
              <span>Milestone</span>
              <hr className="divider-short"/>
            </div>
            <div className="issue-right-panel">
              <span>Linked pull requests</span>
              <hr className="divider-short"/>
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