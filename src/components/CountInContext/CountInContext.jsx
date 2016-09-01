import React, { PureComponent, PropTypes } from 'react';

import d3 from 'd3';

import './CountInContext.scss';

export default class CountInContext extends PureComponent {
  static propTypes = {
    height: React.PropTypes.number,
    parkId: PropTypes.string,
    parks: PropTypes.array,
    width: React.PropTypes.number,
  }

  static defaultProps = {
    parkId: '',
    parks: [],
  }

  /**
  * Initiailize the vis components when the component is about to mount
  */
  componentWillMount() {
    this.visComponents = this.makeVisComponents(this.props);
  }

  /**
   * When new props are received, regenerate vis components if necessary
   */
  componentWillReceiveProps(nextProps) {
    // regenerate the vis components if the relevant props change
    this.visComponents = this.makeVisComponents(nextProps);
  }

  makeVisComponents(props) {
    const { width, height, parks, parkId } = props;
    const squareSize = 30;
    const padding = { left: squareSize, right: squareSize };
    const xExtent = d3.extent(parks, (p) => p.count);
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, width - (padding.left + padding.right)]);
    const parkCount = parks.filter((p) => p.id === parkId)[0];
    return {
      parkCount,
      xScale,
      width,
      height,
      padding,
      squareSize,
    };
  }

  renderChart() {
    const { height, xScale, parkCount, padding, squareSize } = this.visComponents;
    let rect = '';
    if (parkCount) {
      rect = (
        <g transform={`translate(${xScale(parkCount.count)},${(height / 2) - (squareSize / 2)})`}>
          <rect
            width={squareSize}
            height={squareSize}
            rx="5"
            ry="5"
          />
          <text x={squareSize / 2} y={squareSize / 2} dy={5} className="context-text">{parkCount.count}</text>

        </g>
        );
    }
    return (
      <g transform={`translate(${padding.left},${0})`}>
        <line
          className="context-line"
          strokeWidth={2}
          x1={0}
          y1={height / 2}
          x2={xScale.range()[1]}
          y2={height / 2}
        />
        {rect}
      </g>
    );
  }


  render() {
    const { height, width } = this.props;

    return (
      <div className="CountInContext">
        <svg
          className="count-in-context-chart"
          width={width}
          height={height}
          ref={node => { this.root = node; }}
        >
          {this.renderChart()}
        </svg>
      </div>
    );
  }

}
