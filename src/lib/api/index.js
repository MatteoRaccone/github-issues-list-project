import axios from 'axios';
import parseLink from 'parse-link-header';

const isLastPage = (pageLinks) => {
  return Object.keys(pageLinks).length === 2 &&
    pageLinks.first && pageLinks.prev;
}

const getPageCount = (pageLinks) => {
  if(isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if(pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0;
  }
}

export function getIssues(org, repo, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;
  return axios.get(url)
    .then(res => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = getPageCount(pageLinks);
      return {
        pageLinks,
        pageCount,
        data: res.data
      };
    })
    .catch(err => {
      return Promise.reject({
        pageLinks: {},
        pageCount: 0,
        data: [],
        error: err
      });
    });
}

export function getRepoDetails(org, repo) {
  const url = `https://api.github.com/repos/${org}/${repo}`;
  return axios.get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(-1);
    });
}