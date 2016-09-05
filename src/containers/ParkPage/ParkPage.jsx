import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { browserHistory, Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import * as SearchActions from '../../redux/search/actions';
import * as SymbolsActions from '../../redux/symbols/actions';
import * as ParksActions from '../../redux/parks/actions';
import * as ParksSelectors from '../../redux/parks/selectors';
import * as SearchSelectors from '../../redux/search/selectors';
import * as SymbolsSelectors from '../../redux/symbols/selectors';

import UrlHandler from '../../url/UrlHandler';
import urlConnect from '../../url/urlConnect';

import { SymbolList, MapView } from '../../components';


// Define how to read/write state to URL query parameters
const urlQueryConfig = {};
const urlHandler = new UrlHandler(urlQueryConfig, browserHistory);

function mapStateToProps(state, propsWithUrl) {
  return {
    ...propsWithUrl,
    parkIds: SearchSelectors.getParkSearch(state),
    parkInfo: ParksSelectors.getParkInfo(state, propsWithUrl),
    symbolInfo: SymbolsSelectors.getSymbols(state),
  };
}

class ParkPage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    parkId: PropTypes.string,
    parkIds: PropTypes.object,
    parkInfo: PropTypes.object,
    symbolInfo: PropTypes.object,
  }

  static defaultProps = {
    parkInfo: {},
    symbolInfo: {},
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
    const { dispatch, parkId } = props;
    dispatch(ParksActions.fetchParkSymbolsIfNeeded(parkId));
    dispatch(SymbolsActions.fetchSymbolsIfNeeded());
    dispatch(SearchActions.fetchParkSearchIfNeeded());
  }

  handleMapTabSelect(e) {
    console.log(e);
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
    const { parkInfo } = this.props;
    if (!parkInfo.maps) {
      return null;
    }
    return (
      <div className="map-view-container">
        <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleMapTabSelect}>
          {parkInfo.maps.map(this.renderNavItem)}
        </Nav>
        {/* <p><strong>TODO: zoomable map with symbols highlighted and toggleable</strong></p> */}
        <MapView
          map={parkInfo.maps[0]}
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

export default urlConnect(urlHandler, mapStateToProps)(ParkPage);
