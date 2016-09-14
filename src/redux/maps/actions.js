/**
 * Actions for search
 */
export const FETCH_MAP = 'maps/FETCH_MAP';
export const FETCH_MAP_SUCCESS = 'maps/FETCH_MAP_SUCCESS';
export const FETCH_MAP_FAIL = 'maps/FETCH_MAP_FAIL';

/**
 * Action Creators
 */

// ---------------------
// Fetch Park symbols
// ---------------------
function shouldFetchMap(state, mapId) {
  const map = state.maps[mapId];

  if (map && map.isFetching) {
    return false;
  }
  if (map && map.isFetched) {
    return false;
  }
  if (map && map.error) {
    return false;
  }
  return true;
}

function fetchMap(mapId) {
  return {
    types: [FETCH_MAP, FETCH_MAP_SUCCESS, FETCH_MAP_FAIL],
    promise: (api) => api.getZoomMap(mapId),
    mapId,
  };
}

export function fetchMapIfNeeded(mapId) {
  return (dispatch, getState) => {
    if (shouldFetchMap(getState(), mapId)) {
      dispatch(fetchMap(mapId));
    }
  };
}
