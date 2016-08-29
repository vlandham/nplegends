/**
 * Actions for search
 */
export const FETCH_SYMBOLS = 'symbols/FETCH_SYMBOLS';
export const FETCH_SYMBOLS_SUCCESS = 'symbols/FETCH_SYMBOLS_SUCCESS';
export const FETCH_SYMBOLS_FAIL = 'symbols/FETCH_SYMBOLS_FAIL';

/**
 * Action Creators
 */

// ---------------------
// Fetch Park symbols
// ---------------------
function shouldFetchSymbols(state) {
  const symbols = state.symbols.symbols;

  if (symbols && symbols.isFetching) {
    return false;
  }
  if (symbols && symbols.isFetched) {
    return false;
  }
  if (symbols && symbols.error) {
    return false;
  }
  return true;
}

function fetchSymbols() {
  return {
    types: [FETCH_SYMBOLS, FETCH_SYMBOLS_SUCCESS, FETCH_SYMBOLS_FAIL],
    promise: (api) => api.getSymbolsData(),
  };
}

export function fetchSymbolsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchSymbols(getState())) {
      dispatch(fetchSymbols());
    }
  };
}
