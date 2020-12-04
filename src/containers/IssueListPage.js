import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb} from 'react-bootstrap';
import Octicon, { repo, info } from 'octicons-react';
import IssueList from '../components/IssueList';
import { getIssues, getOpenIssueCount } from '../lib/api';
import opened from './opened.svg';

class IssueListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
      openIssues: -1,
      pages: {}
    };
  }

  componentDidMount() {
    const {org, repo} = this.props;

    getIssues(org, repo, 1).then(issueResponse => {
      this.setState({
        pages: issueResponse.pages,
        issues: issueResponse.data,
        loading: false
      });
    });

    getOpenIssueCount(org, repo).then(openIssues => {
      this.setState({ openIssues });
    });
  }

  render() {
    const {org, rep} = this.props;
    const {openIssues, issues, loading} = this.state;

    return (
      <Fragment>
      <Breadcrumb className ="sub-header">
        <Octicon className="repo-icon" icon={repo} />
        <Breadcrumb.Item href="#">React</Breadcrumb.Item>
        <Breadcrumb.Item active href="#">Dechit</Breadcrumb.Item>
      </Breadcrumb>
      <div className="box-header container">
        <div class="m-0 p-3">
          <span class="opened">
            <img src={opened} alt="opened" />
          </span>
          <span class="m-0">{openIssues > -1 ? openIssues : '--'} open</span>
        </div>
      </div>
      <div>
      {loading ? <span>Loading...</span> : <IssueList issues={issues}/>}
      </div>
      </Fragment>
    );
  }
}

IssueListPage.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired
};

export default IssueListPage;
