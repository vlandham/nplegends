export const UPDATE_MAP = 'parkPage/update_map';

/**
 * Action for highlighting the hourly chart
 */
export function updateViewedMap(mapIndex) {
  return {
    type: UPDATE_MAP,
    mapIndex,
  };
}
