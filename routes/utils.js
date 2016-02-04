
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
  console.log(config.USERNAME);
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