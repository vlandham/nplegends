import React, { PureComponent, PropTypes } from 'react';
// import OpenSeadragon from 'openseadragon';

import './MapView.scss';

export default class MapView extends PureComponent {

  static propTypes = {
    mapId: PropTypes.string,
  }

  static defaultProps = {
    mapId: 'ddd',
  }

  render() {
    const viewer = OpenSeadragon({
      id: 'zoom-view',
      prefixUrl: 'img/openseadragon',
    });

    const style = { width: 940, height: 700 };

    return (
      <div className="MapView">
        <div id="zoom-view" style={style}> MAP </div>
      </div>
    );
  }
}
