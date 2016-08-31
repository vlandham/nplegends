import React, { PureComponent, PropTypes } from 'react';

import './SymbolList.scss';

export default class SymbolList extends PureComponent {
  static propTypes = {
    symbolCounts: PropTypes.array,
  }

  static defaultProps = {
    symbolCounts: [],
  }

  renderSymbol(symbol) {
    return (
      <span key={symbol.id} className="symbol-name">
        <img src={`/symbols/${symbol.id}.png`} alt={symbol.id} />
        {symbol.name} <span className="symbol-count">{symbol.count}</span>
      </span>
    );
  }

  render() {
    const { symbolCounts } = this.props;
    return (
      <div className="SymbolList">
        {symbolCounts.map((s) => this.renderSymbol(s))}
      </div>
    );
  }
}
