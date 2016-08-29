import superagent from 'superagent';
import config from '../config';
import LRUCache from './LRUCache';

const apiCache = new LRUCache(config.apiCacheLimit);
if (__DEVELOPMENT__ && __CLIENT__) {
  console.log('[dev] apiCache = ', apiCache);
  window.apiCache = apiCache;
}

/**
 * Formats a URL to go via the API server
 *
 * @param {String} path the relative path of the API call
 */
function formatUrl(type, typeId) {
  // Prepend API root
  if (typeId) {
    return `./data/${type}/${typeId}/symbols.json`;
  } else {
    return `./data/${type}.json`;
  }
}

/**
 * Create a caching key based on the URL
 *
 * @param {String} path the URL path
 * @param {Object} params the query parameters
 * @return {String} the cache key
 */
function urlCacheKey(path, params) {
  return JSON.stringify({ path, params });
}

export function getQuick(type, typeId) {
  return new Promise((resolve, reject) => {
    const data = require(formatUrl(type, typeId));
    resolve(data);
  });
}

/**
 * Makes an AJAX get request
 *
 * @param {String} path The relative API URL to request from
 * @param {Object} options The request options
 * @param {Object} options.params The query parameters
 * @return {Promise} The promise for the request
 */
export function get(type, typeId, { params } = {}) {
  return new Promise((resolve, reject) => {
    // check for a cached response
    const cacheKey = urlCacheKey(typeId, params);
    const cached = apiCache.get(cacheKey);

    // found in cache
    if (false) {
      resolve(cached);
      return;
    }

    // wasn't cached, so make a request
    const request = superagent.get(formatUrl(type, typeId));

    // add in query parameters
    if (params) {
      request.query(params);
    }

    request.end((err, { body } = {}) => {
      // reject if there was an error or there is an error key in the body
      if (err || (body && body.error)) {
        reject(body || err);
      }

      console.log(err);

      // wasn't an error, so cache the result.
      // since the body is what is cached, this happens before transformations
      // if you want to cache transformed data, modify the body object directly
      // and make sure your transform checks to see if the data is already
      // transformed.
      apiCache.put(cacheKey, body);
      resolve(body);
    });
  });
}
