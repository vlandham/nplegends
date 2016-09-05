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

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onLabelClick = this.onLabelClick.bind(this);
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

  onMouseOver() {
    this.setState({ hover: true });
    return true;
  }

  onMouseOut() {
    this.setState({ hover: false });
    return true;
  }

  onLabelClick(event) {
    // console.log(event)
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.key)
  }

  makeVisComponents(props) {
    const { width, height, parks, parkId } = props;
    const squareSize = 30;
    const padding = { left: squareSize * 2, right: squareSize * 2 };
    const xExtent = d3.extent(parks, (p) => p.count);
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, width - (padding.left + padding.right)]);
    const parkCount = parks.filter((p) => p.id === parkId)[0];
    const labels = [];
    if (parkCount && parks && parks.length > 0) {
      // let frontLabel = false;
      if (xExtent[0] === parkCount.count) {
        labels.push(parkCount);
      } else {
        labels.push(parks[parks.length - 1]);
      }

      if (xExtent[1] === parkCount.count) {
        labels.push(parkCount);
      } else {
        labels.push(parks[0]);
      }
    }

    const showLine = (xScale.domain()[0] !== xScale.domain()[1]);
    return {
      parkCount,
      labels,
      xScale,
      width,
      height,
      showLine,
      padding,
      squareSize,
    };
  }

  renderChart() {
    const { height, xScale, parkCount, padding, squareSize, showLine } = this.visComponents;
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
    let line = '';
    if (showLine) {
      line = (
        <line
          className="context-line"
          strokeWidth={2}
          x1={0}
          y1={height / 2}
          x2={xScale.range()[1]}
          y2={height / 2}
        />
      );
    }
    return (
      <g transform={`translate(${padding.left},${0})`}>
        {line}
        {rect}
      </g>
    );
  }

  renderBackground(width, height) {
    return (
      <rect
        width={width}
        height={height}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        // onClick={this.onLabelClick}
        fill="none"
        pointerEvents="all"
      />
    );
  }

  renderLabels(hover) {
    const { width, padding, height, labels, showLine } = this.visComponents;

    if (showLine && hover) {
      return (
        <g className="context-labels">
          <text
            x={padding.left}
            y={height - 5}
            textAnchor="middle"
            className="context-label"
            key={labels[0].id}
            onClick={this.onLabelClick}
            // onMouseOver={this.onMouseOver}
            // onMouseOut={this.onMouseOut}
          >
            {labels[0].name}
          </text>
          <text
            x={width - padding.right}
            y={height - 5}
            textAnchor="middle"
            className="context-label"
            key={labels[1].id}
            onClick={this.onLabelClick}
            // onMouseOver={this.onMouseOver}
            // onMouseOut={this.onMouseOut}
          >
            {labels[1].name}
          </text>
        </g>
      );
    }

    return null;
  }


  render() {
    const { height, width } = this.props;
    const { hover } = this.state;

    return (
      <div className="CountInContext">
        <svg
          className="count-in-context-chart"
          width={width}
          height={height}
          ref={node => { this.root = node; }}
        >
          {this.renderChart()}
          {this.renderLabels(hover)}
          {this.renderBackground(width, height)}
        </svg>
      </div>
    );
  }

}
