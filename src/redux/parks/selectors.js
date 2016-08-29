/**
 * Selectors for locationPage
 */

// import { createSelector } from 'reselect';
import { initialParkState } from '../parks/reducer';

// ----------------------
// Input Selectors
// ----------------------

export function getParkInfo(state, props) {
  // read in locationId from props
  const { parkId } = props;

  if (parkId == null || !state.parks[parkId]) {
    return initialParkState;
  }

  return state.parks[parkId].data;
}
