// import get from './get';
import { getQuick } from './get';

import { transformParkInfo } from './transforms';

// -------------
// API Calls
// -------------

/**
 * Get park data
 *
 * @return {Promise} A promise after the get request was made
 */
export function getParkData(parkId) {
  return getQuick('parks', parkId)
    .then(transformParkInfo);
}

export function getParkSearch() {
  return getQuick('parks', 'park_ids');
}

export function getSymbolsData() {
  return getQuick('symbols');
}

/**
 * Get symbol data
 *
 * @return {Promise} A promise after the get request was made
 */
// export function getSymbolData(symbolId) {
  // return get(`/parks/${symbolId}`);
// }
