/**
 * Reducer for globalSearch
 */
import * as Actions from './actions';

const initialState = {
  parkSearch: {
    data: {},
    isFetching: false,
    isFetched: false,
  },
};

// the location page reducer
function parkSearch(state = initialState.parkSearch, action = {}) {
  switch (action.type) {
    case Actions.FETCH_PARK_SEARCH:
      return {
        data: state.data,
        query: action.searchQuery,
        isFetching: true,
        isFetched: false,
      };
    case Actions.FETCH_PARK_SEARCH_SUCCESS:
      return {
        ...state,
        data: action.result,
        isFetching: false,
        isFetched: true,
      };
    case Actions.FETCH_PARK_SEARCH_FAIL:
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
function search(state = initialState, action = {}) {
  switch (action.type) {
    case Actions.FETCH_PARK_SEARCH:
    case Actions.FETCH_PARK_SEARCH_SUCCESS:
    case Actions.FETCH_PARK_SEARCH_FAIL:
      return {
        ...state,
        parkSearch: parkSearch(state.parkSearch, action),
      };
    default:
      return state;
  }
}


// Export the reducer
export default search;
