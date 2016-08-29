/**
 * Reducer for globalSearch
 */
import * as Actions from './actions';

const initialState = {
};

const initialParkState = {
  data: [],
  isFetching: false,
  isFetched: false,
};

// the location page reducer
function park(state, action = {}) {
  console.log(action);
  if (!state) {
    state = Object.assign({
      parkId: action.parkId,
    }, initialParkState);
  }
  switch (action.type) {
    case Actions.FETCH_PARK_SYMBOLS:
      return {
        data: state.data,
        isFetching: true,
        isFetched: false,
      };
    case Actions.FETCH_PARK_SYMBOLS_SUCCESS:
      return {
        ...state,
        data: action.result.results,
        isFetching: false,
        isFetched: true,
      };
    case Actions.FETCH_PARK_SYMBOLS_FAIL:
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
function parks(state = initialState, action = {}) {
  const { parkId } = action;
  switch (action.type) {
    case Actions.FETCH_PARK_SYMBOLS:
    case Actions.FETCH_PARK_SYMBOLS_SUCCESS:
    case Actions.FETCH_PARK_SYMBOLS_FAIL:
      return {
        ...state,
        [parkId]: park(state[parkId], action),
      };
    default:
      return state;
  }
}


// Export the reducer
export default parks;
