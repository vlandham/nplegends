// import get from './get';
import { getQuick } from './get';

// -------------
// API Calls
// -------------

/**
 * Get park data
 *
 * @return {Promise} A promise after the get request was made
 */
export function getParkData(parkId) {
  return getQuick('parks', parkId);
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
