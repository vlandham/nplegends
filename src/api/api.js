// import get from './get';
import { remoteGet, xmlGet } from './remote_get';

import { transformParkInfo, transformSymbols } from './transforms';

// -------------
// API Calls
// -------------

/**
 * Get park data
 *
 * @return {Promise} A promise after the get request was made
 */
export function getParkData(parkId) {
  return remoteGet('parks', parkId)
    .then(transformParkInfo);
}

export function getParkSearch() {
  return remoteGet('park_ids');
}

export function getSymbolsData() {
  return remoteGet('all_symbols')
    .then(transformSymbols);
}

export function getZoomMap(mapId) {
  return xmlGet(`/data/zooms/${mapId}.dzi`)
    .then(transformSymbols);
}

/**
 * Get symbol data
 *
 * @return {Promise} A promise after the get request was made
 */
// export function getSymbolData(symbolId) {
  // return get(`/parks/${symbolId}`);
// }
