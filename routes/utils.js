
/**
 * Utility methods.
 * @module routes/utils
*/

import request from 'request';

'use strict';

/** 
 * Helper function for returning JSON from url. Returns a Promise object
   which will in turn resolve with the data returned from the Github API.
 *
 * @param {string} url - The url to query.
 * @return {object} data - JSON response from API.
*/
export function getJSON(url, config) {
  return new Promise((resolve, reject) => {
    request.get(url, { 'auth': { 'user': config.USERNAME, 'pass': config.PASSWORD}}, 
      (error, response, body) => {
        if(response.statusCode == 200) {
            let data = JSON.parse(body);
            resolve(data);
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

export function getIssueCommentUrls(count, config) {
  let urls = [];
  while(count > 0) {
    const url = 'https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/issues/' + count + '/comments';
    urls.push(url);
    count--;
  }

  let promises = urls.map((url) => getJSON(url, config));
  return promises;
}