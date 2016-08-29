import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import * as ParksActions from '../../redux/parks/actions';
import * as ParksSelectors from '../../redux/parks/selectors';

import UrlHandler from '../../url/UrlHandler';
import urlConnect from '../../url/urlConnect';


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
    symbols: ParksSelectors.getSymbols(state, propsWithUrl),
  };
}

class ParkPage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    parkId: PropTypes.string,
    symbols: PropTypes.object,
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

  renderCityProviders() {
    return (
      <div>
        <h2>City {this.props.parkId}</h2>
        <Row>
          <Col md={3}>
            <div>HELLO</div>
          </Col>
          <Col md={9}>
            <div>HELLO col 9</div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Park" />
        <h1>Park</h1>
        <div>This is the park page.</div>
        {this.renderCityProviders()}
      </div>
    );
  }
}

export default urlConnect(urlHandler, mapStateToProps)(ParkPage);
