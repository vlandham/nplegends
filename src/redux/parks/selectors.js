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
  const { params } = props;
  const parkId = params.parkId;

  if (parkId == null || !state.parks[parkId]) {
    return initialParkState;
  }

  const info = state.parks[parkId].data;

  return info;
}

function xmlToJson(mapXml, mapId) {
  const image = mapXml.children[0];
  const format = image.getAttribute('Format');
  const overlap = image.getAttribute('Overlap');
  const tilesize = image.getAttribute('TileSize');
  const xmlns = image.getAttribute('xmlns');

  const size = image.children[0];

  const width = size.getAttribute('Width');
  const height = size.getAttribute('Height');

  const out = {
    Image: {
      xmlns: xmlns,
      Url: `/data/zooms/${mapId}_files/`,
      Format: format,
      Overlap: overlap,
      TileSize: tilesize,
      Size: {
        Height: height,
        Width: width,
      },
    },
  };

  return out;
}


export function getMapsForPark(state, props) {
  const park = getParkInfo(state, props);
  const maps = {};
  if (park && park.maps) {
    park.maps.forEach((mapInfo) => {
      const mapId = mapInfo.map;
      let map = null;
      if (state.maps[mapId] && state.maps[mapId].isFetched) {
        map = xmlToJson(state.maps[mapId].data, mapId);
      }
      maps[mapId] = map;
    });
  }
  return maps;
}
