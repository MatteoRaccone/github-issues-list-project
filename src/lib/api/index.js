import axios from 'axios';
import parseLink from 'parse-link-header';
import repoInit from "../../repoInit";

const isLastPage = (pageLinks) => {
  return Object.keys(pageLinks).length === 0 &&
    pageLinks.first && pageLinks.prev;
}

const getPageCount = (pageLinks) => {
  if(pageLinks == null) {
    return null;
  }
}

export function getIssues(page = 1) {
  const url = `${repoInit.baseUrl}/repos/${repoInit.org}/${repoInit.repo}/issues?per_page=25&page=${page}`;
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

export function getRepoDetails() {
  const url = `${repoInit.baseUrl}/repos/${repoInit.org}/${repoInit.repo}`;
  return axios.get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(-1);
    });
}

export function getIssue(number) {
  const url = `${repoInit.baseUrl}/repos/${repoInit.org}/${repoInit.repo}/issues/${number}`;
  return axios.get(url)
    .then(res => res.data)
    .catch(err => Promise.reject({}));
}

export function getComments(url) {
  return axios.get(url)
    .then(res => res.data)
    .catch(err => Promise.reject({}));
}