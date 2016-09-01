import React, { PureComponent, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import { CountInContext } from '../../components';

import './SymbolList.scss';

export default class SymbolList extends PureComponent {
  static propTypes = {
    parkId: PropTypes.string,
    parks: PropTypes.object,
    symbolCounts: PropTypes.array,
  }

  static defaultProps = {
    symbolCounts: [],
    parks: {},
  }

  renderSymbol(symbol, parks, parkId) {
    return (
      <Row key={symbol.id} className="symbol-row">
        <Col md={4}>
          <div className="symbol-info">
            <img className="symbol-icon" src={`/symbols/${symbol.id}.png`} alt={symbol.id} />
            {symbol.name}
          </div>

        </Col>
        <Col md={4}>
          <CountInContext
            width={200}
            height={60}
            parks={parks}
            parkId={parkId}
          />

        </Col>
      </Row>
    );
  }

  render() {
    const { symbolCounts, parks, parkId } = this.props;
    return (
      <div className="SymbolList">
        {symbolCounts.map((s) => this.renderSymbol(s, parks[s.id], parkId))}
      </div>
    );
  }
}
