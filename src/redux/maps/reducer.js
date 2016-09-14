/**
 * Reducer for globalSearch
 */
import * as Actions from './actions';

const initialState = {
};

const initialMapState = {
  data: {},
  isFetching: false,
  isFetched: false,
};

// the location page reducer
function map(state, action = {}) {
  if (!state) {
    state = Object.assign({
      mapId: action.mapId,
    }, initialMapState);
  }
  switch (action.type) {
    case Actions.FETCH_MAP:
      return {
        data: state.data,
        isFetching: true,
        isFetched: false,
      };
    case Actions.FETCH_MAP_SUCCESS:
      return {
        ...state,
        data: action.result,
        isFetching: false,
        isFetched: true,
      };
    case Actions.FETCH_MAP_FAIL:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// The root reducer
function maps(state = initialState, action = {}) {
  const { mapId } = action;
  switch (action.type) {
    case Actions.FETCH_MAP:
    case Actions.FETCH_MAP_SUCCESS:
    case Actions.FETCH_MAP_FAIL:
      return {
        ...state,
        [mapId]: map(state[mapId], action),
      };
    default:
      return state;
  }
}


// Export the reducer
export default maps;
