import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import * as SearchActions from '../../redux/search/actions';
import * as SymbolsActions from '../../redux/symbols/actions';
import * as SearchSelectors from '../../redux/search/selectors';
import * as SymbolsSelectors from '../../redux/symbols/selectors';

import { OmniSearch, SymbolList } from '../../components';

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

  renderSymbolList(symbols) {
    return (
      <div>
        <SymbolList
          symbolCounts={symbols}
        />
      </div>
    );
  }

  render() {
    const { symbolInfo } = this.props;
    console.log(symbolInfo);
    return (
      <div className="home-page">
        <Helmet title="Home" />
        <h1>Home</h1>

        <div className="omni-search-container">
          {this.renderSearch()}
          {this.renderSymbolList(symbolInfo.totals)}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
