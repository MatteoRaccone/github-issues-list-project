import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb} from 'react-bootstrap';
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
    const {org, repo} = this.props;
    const {openIssues, issues, loading} = this.state;

    return (
      <>
      <Breadcrumb className ="sub-header">
        <Breadcrumb.Item href="#">{org}</Breadcrumb.Item>
        <Breadcrumb.Item active href="#">{repo}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="box-header container">
        <div className="m-0 pb-3 pt-3 px-0">
          <span className="opened">
            <img src={opened} alt="opened" />
          </span>
          <span className="m-0">{openIssues > -1 ? openIssues : '--'} open</span>
        </div>
      </div>
      <div>
      {loading ? <span>Loading...</span> : <IssueList issues={issues}/>}
      </div>
      </>
    );
  }
}

IssueListPage.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired
};

export default IssueListPage;
