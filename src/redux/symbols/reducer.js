/**
 * Reducer for globalSearch
 */
import * as Actions from './actions';

const initialSymbolsState = {
  data: [],
  isFetching: false,
  isFetched: false,
};

const initialState = {
  symbols: initialSymbolsState,
};


// the location page reducer
function symbols(state = initialSymbolsState, action = {}) {
  switch (action.type) {
    case Actions.FETCH_SYMBOLS:
      return {
        data: state.data,
        isFetching: true,
        isFetched: false,
      };
    case Actions.FETCH_SYMBOLS_SUCCESS:
      return {
        ...state,
        data: action.result,
        isFetching: false,
        isFetched: true,
      };
    case Actions.FETCH_SYMBOLS_FAIL:
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
function symbolsRoot(state = initialState, action = {}) {
  switch (action.type) {
    case Actions.FETCH_SYMBOLS:
    case Actions.FETCH_SYMBOLS_SUCCESS:
    case Actions.FETCH_SYMBOLS_FAIL:
      return {
        ...state,
        symbols: symbols(state.symbols, action),
      };
    default:
      return state;
  }
}


// Export the reducer
export default symbolsRoot;
