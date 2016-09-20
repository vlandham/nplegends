import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import * as SearchActions from '../../redux/search/actions';
import * as SymbolsActions from '../../redux/symbols/actions';
import * as MapsActions from '../../redux/maps/actions';
import * as ParksActions from '../../redux/parks/actions';
import * as ParksSelectors from '../../redux/parks/selectors';
import * as SearchSelectors from '../../redux/search/selectors';
import * as SymbolsSelectors from '../../redux/symbols/selectors';
import * as ParkPageSelectors from '../../redux/parkPage/selectors';
import * as ParkPageActions from '../../redux/parkPage/actions';

// import UrlHandler from '../../url/UrlHandler';
// import urlConnect from '../../url/urlConnect';

import { SymbolList, MapView } from '../../components';


// Define how to read/write state to URL query parameters
// const urlQueryConfig = {};
// const urlHandler = new UrlHandler(urlQueryConfig, hashHistory);

function mapStateToProps(state, propsWithUrl) {
  return {
    ...propsWithUrl,
    parkIds: SearchSelectors.getParkSearch(state),
    parkInfo: ParksSelectors.getParkInfo(state, propsWithUrl),
    symbolInfo: SymbolsSelectors.getSymbols(state),
    maps: ParksSelectors.getMapsForPark(state, propsWithUrl),
    mapIndex: ParkPageSelectors.getMapIndex(state),
  };
}

class ParkPage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    mapIndex: PropTypes.number,
    maps: PropTypes.object,
    params: PropTypes.object,
    parkIds: PropTypes.object,
    parkInfo: PropTypes.object,
    symbolInfo: PropTypes.object,
  }

  static defaultProps = {
    parkInfo: {},
    symbolInfo: {},
    mapIndex: 0,
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.handleMapTabSelect = this.handleMapTabSelect.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }


  /**
   * Fetch the data for the page if needed
   */
  fetchData(props) {
    const { dispatch, parkInfo, params } = props;
    dispatch(ParksActions.fetchParkSymbolsIfNeeded(params.parkId));
    dispatch(SymbolsActions.fetchSymbolsIfNeeded());
    dispatch(SearchActions.fetchParkSearchIfNeeded());
    if (parkInfo && parkInfo.maps) {
      parkInfo.maps.forEach((map) => dispatch(MapsActions.fetchMapIfNeeded(map.map)));
    }
  }

  handleMapTabSelect(e) {
    const { dispatch } = this.props;
    dispatch(ParkPageActions.updateViewedMap(e - 1));
    console.log(e);
    // const mapId = parkInfo.maps[mapIndex].map;
  }

  renderSymbolList() {
    const { parkInfo, symbolInfo } = this.props;
    return (
      <div>
        <SymbolList
          symbolCounts={parkInfo.totals}
          parks={symbolInfo.parks}
          parkId={parkInfo.id}
        />
      </div>
    );
  }

  renderNavItem(map, index) {
    const name = map.map.replace(/-/g, ' ');
    return (
      <NavItem key={map.map} eventKey={index + 1}>{name}</NavItem>
    );
  }

  renderMaps() {
    const { parkInfo, mapIndex, maps } = this.props;
    if (!parkInfo.maps) {
      return null;
    }
    const mapId = parkInfo.maps[mapIndex].map;
    return (
      <div className="map-view-container">
        <Nav bsStyle="tabs" activeKey={mapIndex + 1} onSelect={this.handleMapTabSelect}>
          {parkInfo.maps.map(this.renderNavItem)}
        </Nav>
        {/* <p><strong>TODO: zoomable map with symbols highlighted and toggleable</strong></p> */}
        <MapView
          info={parkInfo.maps[mapIndex]}
          map={maps[mapId]}
        />
      </div>

    );
  }

  render() {
    const { parkInfo } = this.props;
    return (
      <div>
        <Helmet title="Park" />
        <Link to={'/'}>&#171; All Symbols</Link>
        <h1>{ parkInfo['Name'] }</h1>
        <div><p>{ parkInfo['Description'] }</p></div>
        <h2 className="banner">Symbols</h2>
        <h4>{ parkInfo.symbol_count } Symbols in { parkInfo.map_count } Maps</h4>
        {this.renderSymbolList()}
        <h2 className="banner">Maps</h2>
        {this.renderMaps()}
      </div>
    );
  }
}

// export default urlConnect(urlHandler, mapStateToProps)(ParkPage);
export default connect(mapStateToProps)(ParkPage);
