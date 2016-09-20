import React, { PureComponent, PropTypes } from 'react';
import { Element } from 'react-scroll';

import { Link } from 'react-router';
import { pluralize } from '../../utils/string';
import './SymbolParks.scss';

export default class SymbolParks extends PureComponent {
  static propTypes = {
    parks: PropTypes.array,
    symbol: PropTypes.object,
  }

  static defaultProps = {
    symbolInfo: {},
    parks: [],
  }

  sortByCount(parks) {
    return parks.sort((a, b) => b.count - a.count);
  }


  renderPark(park) {
    return (
      <span key={park.id} className="park-name">
        <Link to={`/park/${park.id}`}>
          {park.name} <span className="park-count">{park.count}</span>
        </Link>
      </span>
    );
  }

  render() {
    const { parks, symbol } = this.props;
    if (!symbol) {
      return <div />;
    }
    return (
      <Element key={symbol.id} name={symbol.id}>
      <div key={symbol.id} className="SymbolParks">
        <h3>
          <img className="symbol-icon" src={`/symbols/${symbol.id}.png`} alt={symbol.id} /> {symbol.name}
          <span className="found-line">Found <span className="symbol-count">{symbol.count}</span>
            {pluralize(symbol.count, 'time')} in <span className="park-total-count">{parks.length}</span> {pluralize(parks.length, 'park')}</span>

        </h3>
        <div className="parks">
          {parks.map((p) => this.renderPark(p))}
        </div>
      </div>
      </Element>
    );
  }
}
