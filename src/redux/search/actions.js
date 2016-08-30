/**
 * Actions for search
 */
export const FETCH_PARK_SEARCH = 'parks/FETCH_PARK_SEARCH';
export const FETCH_PARK_SEARCH_SUCCESS = 'parks/FETCH_PARK_SEARCH_SUCCESS';
export const FETCH_PARK_SEARCH_FAIL = 'parks/FETCH_PARK_SEARCH_FAIL';

/**
 * Action Creators
 */

// ---------------------
// Fetch Park symbols
// ---------------------
function shouldFetchParkSearch(state) {
  const search = state.search.parkSearch;

  if (search && search.isFetching) {
    return false;
  }
  if (search && search.isFetched) {
    return false;
  }
  if (search && search.error) {
    return false;
  }
  return true;
}

function fetchParkSearch() {
  return {
    types: [FETCH_PARK_SEARCH, FETCH_PARK_SEARCH_SUCCESS, FETCH_PARK_SEARCH_FAIL],
    promise: (api) => api.getParkSearch(),
  };
}

export function fetchParkSearchIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchParkSearch(getState())) {
      dispatch(fetchParkSearch());
    }
  };
}
