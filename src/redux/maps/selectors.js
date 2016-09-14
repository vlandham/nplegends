/**
 * Selectors for locationPage
 */

// import { createSelector } from 'reselect';
import { initialMapState } from '../maps/reducer';

// ----------------------
// Input Selectors
// ----------------------


export function getMap(state, props) {
  // read in locationId from props
  const { mapId } = props;

  if (mapId == null || !state.maps[mapId]) {
    return initialMapState;
  }

  const info = state.maps[mapId].data;

  return info;
}
