import React, { PureComponent, PropTypes } from 'react';
import d3 from 'd3';

//import './LineChart.scss';

export default class SymbolList extends PureComponent {
  static propTypes = {
    symbolCounts: PropTypes.object,
  }

  static defaultProps = {
    symbolCounts: {},
  }

  render() {
    const { symbolCounts } = this.props;
    console.log(symbolCounts)
    return (
      <div>SYMBOLS</div>
    )
  }
}
