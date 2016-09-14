import React, { PureComponent, PropTypes } from 'react';
// import OpenSeadragon from 'openseadragon';

import './MapView.scss';

export default class MapView extends PureComponent {

  static propTypes = {
    map: PropTypes.object,
  }

  // static defaultProps = {
  //   mapId: 'ddd',
  // }

  constructor(props) {
    super(props);

    this.getMapUrl = this.getMapUrl.bind(this);
  }

  /**
  * Initiailize the vis components when the component is about to mount
  */
  componentWillMount() {
  }


  /**
  * Initiailize the vis components when the component is about to mount
  */
  componentDidMount() {
    const { map } = this.props;
    if (map) {
      // console.log('~~in~~');
      // const image = map.Image;
      // console.log(image);
      // const format = map.getAttribute('Format');
      // console.log(format);
    this.viewer = OpenSeadragon({
      id: 'zoom-view',
      prefixUrl: '/img/openseadragon',
      tileSources: [{
        overlays: [{
          id: 'example-overlay',
          x: 0.33,
          y: 0.75,
          width: 0.2,
          height: 0.25,
          className: 'highlight',
        }],
        getTileUrl: this.getMapUrl(map),
      }],
    });
    }
  }

  /**
   * When new props are received, regenerate vis components if necessary
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.map && (nextProps.map !== this.props.map)) {
      // this.viewer = OpenSeadragon({
      //   id: 'zoom-view',
      //   prefixUrl: 'img/openseadragon',
      //   tileSources: `zooms/${nextProps.mapId}`,
      // });
    }
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;

    if (map && map !== prevProps.map) {
      console.log('~~in update ~~')
      this.viewer = OpenSeadragon({
        id: 'zoom-view',
        prefixUrl: '/img/openseadragon/',
        tileSources: [{
          ...map,
        }],
      });
    }
  }


  getMapUrl(map) {
    return `/zooms/${map.map}.dzi`;
  }

  render() {
    const style = { width: 940, height: 700 };
    const { map } = this.props;
    console.log(map);

    return (
      <div className="MapView">
        <div id="zoom-view" style={style} />
      </div>
    );
  }
}
