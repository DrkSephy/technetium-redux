/**
 * Utility methods.
 * @module routes/utils
*/

import request from 'request';
import moment from 'moment';

'use strict';

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

/** 
 * Helper function for returning JSON from url. Returns a Promise object
   which will in turn resolve with the data returned from the Github API.
 *
 * @param {string} url - The url to query.
 * @return {object} data - JSON response from API.
*/
export function getJSON(url, token) {
  return new Promise((resolve, reject) => {
    request.get(url, { 'auth': { 'bearer': token } },
      (error, response, body) => {
        if (body) {
            resolve(JSON.parse(body));
          } else {
            resolve({});
          }
      });
  });
}

/**
 * Helper function for generating unique numbers for use in React Components.
 * 
 * @param {number} min - The minimum number.
 * @param {number} max - The maximum number.
 * @return {number} undefined
*/
export function generateRandomNumber(min=1, max=9999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an object containing the startDate and endDate.
 *
 * @returns {object} - An object containing the start and end dates.
*/
export function getDateRange() {
  let endDate = moment().add(1, 'days');
  let startDate = moment().subtract(6, 'days');
  return { startDate: startDate, endDate: endDate };
}

/**
 * Generates an array of strings containing all dates within range. 
 *
 * @param {object} startDate - The start date to begin iteration.
 * @param {object} endDate - The end date to end iteration.
 * @returns {object} datesArray - An array of strings containing all dates within range.
*/
export function generateDateRange(startDate, endDate) {
  let datesArray = [];
  let currentDate = moment(startDate);
  endDate = moment(endDate);

  while (currentDate <= endDate) {
    datesArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  
  return datesArray;
}

/**
 * Generates all URLS for accessing Issue Comments.
 *
 * @param {number} count - The number of issues in a repository.
 * @param {object} config - Credentials for making authenticated calls.
 * @return {object} promises - An array of promises for Issue Comments.
*/
export function getIssueCommentUrls(count, auth, username, reponame) {
  let urls = [];
  while (count > 0) {
    const url = 'https://bitbucket.org/api/1.0/repositories/' + username + '/' + reponame + '/' + 'issues/' + count + '/comments';
    urls.push(url);
    count--;
  }

  let promises = urls.map((url) => getJSON(url, auth));
  return promises;
}

/**
 * Helper function for computing all query urls.
 *
 * @param {number} count - The number of commits in a repository.
 * @return {object} promises - An array of promises.
*/
export function computeUrls(baseUrl, apiUrl, count, auth, username, reponame) {
  let urls = [];
  let page = 1;
  let stop;
  if (count >= 30) {
    stop = Math.floor(count / 30);
  } else {
    stop = 1;
  }
  let start = 0;

  while (start <= stop) {
    let url = baseUrl + username + '/' + reponame + apiUrl + '?page=' + page;
    urls.push(url);
    page++;
    start++;
  }

  let promises = urls.map((url) => getJSON(url, auth));
  return promises;
}

export function computeIssueUrls(baseUrl, apiUrl, count, auth, username, reponame) {
  let urls = [];
  let page = 1;
  let stop;
  if (count >= 20) {
    stop = Math.floor(count / 20);
  } else {
    stop = 1;
  }
  let start = 0;

  while (start <= stop) {
    let url = baseUrl + username + '/' + reponame + apiUrl + '?page=' + page;
    urls.push(url);
    page++;
    start++;
  }

  let promises = urls.map((url) => getJSON(url, auth));
  return promises;
}

export function computePullRequestUrls(baseUrl, count, auth, username, reponame) {
  let urls = [];
  let page = 1;
  let stop;
  if (count >= 10) {
    stop = Math.floor(count / 10);
  } else {
    stop = 1;
  }
  let start = 0;

  while (start <= stop) {
    let url = baseUrl + username + '/' + reponame + '/pullrequests?state=merged' + '&page=' + page;
    urls.push(url);
    page++;
    start++;
  }

  let promises = urls.map((url) => getJSON(url, auth));
  return promises;
}