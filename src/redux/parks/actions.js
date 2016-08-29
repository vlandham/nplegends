/**
 * Actions for search
 */
export const FETCH_PARK_SYMBOLS = 'parks/FETCH_PARK_SYMBOLS';
export const FETCH_PARK_SYMBOLS_SUCCESS = 'parks/FETCH_PARK_SYMBOLS_SUCCESS';
export const FETCH_PARK_SYMBOLS_FAIL = 'parks/FETCH_PARK_SYMBOLS_FAIL';

/**
 * Action Creators
 */

// ---------------------
// Fetch Park symbols
// ---------------------
function shouldFetchParkSymbols(state, parkId) {
  const park = state.parks[parkId];

  if (park && park.isFetching) {
    return false;
  }
  if (park && park.isFetched) {
    return false;
  }
  if (park && park.error) {
    return false;
  }
  return true;
}

function fetchParkSymbols(parkId) {
  return {
    types: [FETCH_PARK_SYMBOLS, FETCH_PARK_SYMBOLS_SUCCESS, FETCH_PARK_SYMBOLS_FAIL],
    promise: (api) => api.getParkData(parkId),
    parkId,
  };
}

export function fetchParkSymbolsIfNeeded(parkId) {
  return (dispatch, getState) => {
    if (shouldFetchParkSymbols(getState(), parkId)) {
      dispatch(fetchParkSymbols(parkId));
    }
  };
}
