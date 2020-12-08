import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { getIssue } from '../redux/actions';
import { connect } from 'react-redux';
import IssueLabels from '../components/IssueLabels'
import { Breadcrumb } from 'react-bootstrap';
import Octicon, { issueOpened } from 'octicons-react';
import rep from './rep.png';

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
  

  renderContent() {
    const {issue} = this.props;

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
        <IssueLabels labels={issue.labels}/>
        <hr className="divider-short"/>
        <div className="flex-column flex-md-row d-flex">
          <div class="col-12 col-md-9 mb-4 mb-md-0">
            <div className="issue-summary-header container">
            <span className="author">{issue.user.login}</span>
            </div>
            <div className="issue-detail-summary container">
              {issue.body}
            </div>
            <hr className="divider-short"/>
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

const mapState = ({ issues }, ownProps) => {
  return {
    issue: issues.issuesByNumber[ownProps.match.params.issueId]
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  getIssue: () => dispatch(getIssue('facebook', 'react', ownProps.match.params.issueId))
});

export default connect(mapState, mapDispatch)(IssueDetails);