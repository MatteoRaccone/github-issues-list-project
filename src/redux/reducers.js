import { combineReducers } from 'redux';
import {
  GET_ISSUE_BEGIN, GET_ISSUE_SUCCESS, GET_ISSUE_FAILURE,
  GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
  GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE,
  GET_REPO_DETAILS_BEGIN, GET_REPO_DETAILS_SUCCESS, GET_REPO_DETAILS_FAILURE,
} from './actions';


const initialIssuesState = {
  issuesByNumber: {},
  currentPageIssues: [],
  pageCount: 0,
  pageLinks: {},
  isLoading: false
};

const initialRepoState = {
  openIssuesCount: -1
};

export function issuesReducer(state = initialIssuesState, action) {
  switch(action.type) {
    case GET_ISSUE_BEGIN:
    case GET_ISSUES_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case GET_ISSUE_SUCCESS:
      return {
        ...state,
        issuesByNumber: {
          ...state.issuesByNumber,
          [action.payload.number]: action.payload
        },
        isLoading: false
      };
    case GET_ISSUES_SUCCESS:
      return {
        ...state,
        pageCount: action.payload.pageCount,
        pageLinks: action.payload.pageLinks,
        issuesByNumber: action.payload.issues.reduce((result, issue) => {
          result[issue.number] = issue;
          return result;
        }, {}),
        currentPageIssues: action.payload.issues.map(issue => issue.number),
        isLoading: false
      };
    case GET_ISSUE_FAILURE:
    case GET_ISSUES_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function repoReducer(state = initialRepoState, action) {
  switch(action.type) {
    case GET_REPO_DETAILS_BEGIN:
      return state;
    case GET_REPO_DETAILS_SUCCESS:
      return {
        ...state,
        openIssuesCount: action.payload.open_issues_count
      };
    case GET_REPO_DETAILS_FAILURE:
      return {
        ...state,
        openIssuesCount: -1,
        error: action.error
      };
    default:
      return state;
  }
}

export function commentsReducer(state = {}, action) {
  switch(action.type) {
    case GET_COMMENTS_BEGIN:
      return state;
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        [action.payload.issueNumber]: action.payload.comments
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}


export default combineReducers({
  issues: issuesReducer,
  issueComments: commentsReducer,
  repo: repoReducer
}); 