import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import * as SearchActions from '../../redux/search/actions';
import * as SymbolsActions from '../../redux/symbols/actions';
import * as SearchSelectors from '../../redux/search/selectors';
import * as SymbolsSelectors from '../../redux/symbols/selectors';

import { OmniSearch, SymbolParks } from '../../components';

import './HomePage.scss';

function mapStateToProps(state) {
  return {
    parkIds: SearchSelectors.getParkSearch(state),
    symbolInfo: SymbolsSelectors.getSymbols(state),
  };
}

class HomePage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    parkIds: PropTypes.object,
    symbolInfo: PropTypes.object,
  }

  static defaultProps = {
    symbolInfo: {},
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  fetchData(props) {
    const { dispatch } = props;
    dispatch(SearchActions.fetchParkSearchIfNeeded());
    dispatch(SymbolsActions.fetchSymbolsIfNeeded());
  }

  /**
   * Callback for when viewMetric changes - updates URL
   */
  onSearchQueryChange() {
    // noop
  }

  renderSearch() {
    const { parkIds } = this.props;
    let parks = [];
    if (parkIds) {
      parks = _.values(parkIds);
    }
    return (
      <OmniSearch
        searchResults={parks}
        onSearchChange={this.onSearchQueryChange}
      />
    );
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

  render() {
    const { symbolInfo } = this.props;
    console.log(symbolInfo);
    return (
      <div className="home-page">
        <Helmet title="Home" />
        <h1>NP Legends</h1>
        <p>Exploring the symbols on maps of the US National Park Service</p>

        <div className="omni-search-container">
          {this.renderSearch()}
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
