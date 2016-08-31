import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
// import { Row, Col } from 'react-bootstrap';
import * as ParksActions from '../../redux/parks/actions';
import * as ParksSelectors from '../../redux/parks/selectors';

import UrlHandler from '../../url/UrlHandler';
import urlConnect from '../../url/urlConnect';

import { SymbolList } from '../../components';


// Define how to read/write state to URL query parameters
const urlQueryConfig = {
  viewMetric: { type: 'string', defaultValue: 'download', urlKey: 'metric' },

  // chart options
  boolExample: { type: 'boolean', defaultValue: false, urlKey: 'baselines' },
};
const urlHandler = new UrlHandler(urlQueryConfig, browserHistory);


function mapStateToProps(state, propsWithUrl) {
  return {
    ...propsWithUrl,
    parkInfo: ParksSelectors.getParkInfo(state, propsWithUrl),
  };
}

class ParkPage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    parkId: PropTypes.string,
    parkInfo: PropTypes.object,
  }

  static defaultProps = {
    parkInfo: {},
  }

  constructor(props) {
    super(props);

    // bind handlers
    // this.onHighlightHourly = this.onHighlightHourly.bind(this);
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
  }

  renderSymbolList() {
    const { parkInfo } = this.props;
    return (
      <div>
        <SymbolList
          symbolCounts={parkInfo.totals}
        />
      </div>
    );
  }

  render() {
    const { parkInfo } = this.props;
    return (
      <div>
        <Helmet title="Park" />
        <h1>{ parkInfo['Name'] }</h1>
        <h2>{ parkInfo.symbol_count } Symbols in { parkInfo.map_count } Maps</h2>
        <div><p>{ parkInfo['Description'] }</p></div>
        <h2>Symbols</h2>
        {this.renderSymbolList()}
      </div>
    );
  }
}

export default urlConnect(urlHandler, mapStateToProps)(ParkPage);
