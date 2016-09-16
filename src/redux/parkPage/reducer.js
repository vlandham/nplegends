/**
 * Reducer for locationPage
 */
import * as Actions from './actions';

export const initialState = {
  mapIndex: undefined,
};

// the location page reducer
function parkPage(state = initialState, action = {}) {
  switch (action.type) {
    case Actions.UPDATE_MAP:
      return {
        ...state,
        mapIndex: action.mapIndex,
      };

    default:
      return state;
  }
}


// Export the reducer
export default parkPage;
