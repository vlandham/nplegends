import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import Scroll, { Element, scroller } from 'react-scroll';
// import * as SearchActions from '../../redux/search/actions';
import * as SymbolsActions from '../../redux/symbols/actions';
// import * as SearchSelectors from '../../redux/search/selectors';
import * as SymbolsSelectors from '../../redux/symbols/selectors';

import { SymbolParks, SymbolForce } from '../../components';

import './HomePage.scss';

function mapStateToProps(state) {
  return {
    // parkIds: SearchSelectors.getParkSearch(state),
    symbolInfo: SymbolsSelectors.getSymbols(state),
  };
}

class HomePage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    // parkIds: PropTypes.object,
    symbolInfo: PropTypes.object,
  }

  static defaultProps = {
    symbolInfo: {},
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onSymbolClick = this.onSymbolClick.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  fetchData(props) {
    const { dispatch } = props;
    // dispatch(SearchActions.fetchParkSearchIfNeeded());
    dispatch(SymbolsActions.fetchSymbolsIfNeeded());
  }

  /**
   * Callback for when viewMetric changes - updates URL
   */
  onSearchQueryChange() {
    // noop
  }

  onSymbolClick(d) {
    scroller.scrollTo(d.id, {
      duration: 1500,
      delay: 100,
      smooth: true,
    });
  }

  renderSymbolParks(symbol, parks) {
    return (
      <SymbolParks
        symbol={symbol}
        parks={parks}
        key={symbol.id}
      />
    );
  }

  renderAllSymbolParks(symbols, parks) {
    if (symbols) {
      return (
        <div>
          {symbols.map((s) => this.renderSymbolParks(s, parks[s.id]))}
        </div>
      );
    }
    return null;
  }

  renderTreemap(counts) {
    return (
      <SymbolForce
        width={920}
        height={300}
        symbolCounts={counts}
        onClick={this.onSymbolClick}
      />
    );
  }

  render() {
    const { symbolInfo } = this.props;

    const count = (symbolInfo && symbolInfo.totals) ? symbolInfo.totals.length : "";
    const mapCounts = (symbolInfo && symbolInfo.maps) ? symbolInfo.maps.length : "";

    return (
      <div className="home-page">
        <Helmet title="Home" />
        <p>Exploring the symbols of National Park Service maps with image processing. There are over 200 symbol types used in NP maps. Here, we've automatically detected {count} types in {mapCounts} different park maps. Which symbols are used most at your beloved park? Which is the least used symbols? Find out here!</p>
        <p className="pull-right"><Link to="about">About this Project</Link></p>
        <div className="symbol-treemap-container">
          {this.renderTreemap(symbolInfo.totals)}
        </div>

        <h2 className="banner">Symbols</h2>
        <div className="symbol-list-container">
          {this.renderAllSymbolParks(symbolInfo.totals, symbolInfo.parks)}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
