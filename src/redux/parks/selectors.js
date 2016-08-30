/**
 * Selectors for locationPage
 */

// import { createSelector } from 'reselect';
import _ from 'lodash';
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

  const info = state.parks[parkId].data;

  return info;
}
