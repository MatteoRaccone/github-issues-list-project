import React, { Component} from 'react';
import Paginate from 'react-paginate';
import PropTypes from 'prop-types';
import { Breadcrumb} from 'react-bootstrap';
import IssueList from '../components/IssueList';
import { getIssues, getOpenIssueCount } from '../lib/api';
import opened from './opened.svg';
import rep from './rep.png';

class IssueListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
      openIssues: -1,
      pageLinks: {}
    };
  }

  componentDidMount() {
    const org= 'facebook';
    const repo = 'react';
    
    // Fetch the number of open issues
    getOpenIssueCount(org, repo)
      .then(openIssues => {
        this.setState({ openIssues });
      })
      .catch(error => {
        this.setState({ openIssues: -1 });
      });

    this.fetchIssues(1);
  }

  fetchIssues(page) {
    const org= 'facebook';
    const repo = 'react';

    getIssues(org, repo, page)
      .then(issueResponse => {
        this.setState({
          pageCount: issueResponse.pageCount,
          pageLinks: issueResponse.pageLinks,
          issues: issueResponse.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          pageCount: 0,
          pageLinks: {},
          issues: [],
          loading: false
        });
      });
  }

  handlePageChange = ({ selected }) => {
    this.fetchIssues(selected + 1);
  }

  render() {
    const org= 'facebook';
    const repo = 'react';
    const {openIssues, issues, loading, pageCount} = this.state;
    
    return (
      <>
        <Breadcrumb className ="sub-header">
        <span><img src={rep} alt="rep" className="repo-icon"/></span>
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
        <div className="issues-pagination">
        <Paginate
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange} 
        />
        </div>
        </div>
      </>
    );
  }
}



export default IssueListPage;