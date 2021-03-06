import React, { Component} from 'react';
import ReactSpinner from 'react-bootstrap-spinner';
import { connect } from 'react-redux';
import Paginate from 'react-paginate';
import PropTypes from 'prop-types';
import { Breadcrumb} from 'react-bootstrap';
import IssueList from '../components/IssueList';
import { getIssues, getRepoDetails } from '../redux/actions';
import Octicon, { issueOpened, repoPull } from 'octicons-react';
import { Link } from "react-router-dom";
import repoInit from "../repoInit";

export class IssueListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
      pageLinks: {}
    };
  }

  componentDidMount() {
    const {getIssues, getRepoDetails, org, repo} = this.props;
    
    getRepoDetails(org, repo);
    getIssues(org, repo, 1);
  }
  handlePageChange = ({ selected }) => {
    const {getIssues, org, repo} = this.props;

    getIssues(org, repo, selected + 1);
  }

  render() {
    const {org, repo, isLoading, issues, pageCount, openIssuesCount} = this.props;
    
    return (
      <>
        <Breadcrumb className ="sub-header">
        <span><Octicon className="mr-1" icon={repoPull} /></span>
          <Breadcrumb.Item href="#">{org}</Breadcrumb.Item>
          <Breadcrumb.Item active href="#">{repo}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="container d-flex mt-3 mb-3 px-0">
        <Link className= "ml-auto new-issue-link" to= "/issue/IssueForm">New issue</Link>
        </div>
        <div className="box-header container">
          <div className="m-0 pb-3 pt-3 px-0">
            <span className="opened">
              <Octicon className="sub-header-icon" icon={issueOpened} />
            </span>
            <span className="m-0">{openIssuesCount > -1 ? openIssuesCount : '--'} open</span>
          </div>
        </div>
        <div>
        {isLoading ? (
          <div className= "justify-content-center d-flex mt-3">
            <ReactSpinner type="border" color="primary" size="5"/>
          </div>
        )
         : <IssueList issues={issues}/>}
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

IssueListPage.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
  openIssuesCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

IssueListPage.defaultProps = {
  org: repoInit.org,
  repo: repoInit.repo
};

const selectIssues = issues => 
  issues.currentPageIssues.map(number => issues.issuesByNumber[number]);

const mapStateToProps = ({ issues, repo }) => ({
  issues: selectIssues(issues),
  openIssuesCount: repo.openIssuesCount,
  isLoading: issues.isLoading,
});

const mapDispatch = { getIssues, getRepoDetails };

export default connect(mapStateToProps, mapDispatch)(IssueListPage);