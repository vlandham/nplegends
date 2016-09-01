import React, { PureComponent, PropTypes } from 'react';

import d3 from 'd3';

export default class SymbolTreemap extends PureComponent {
  static propTypes = {
    height: React.PropTypes.number,

    symbolCounts: PropTypes.array,
    width: React.PropTypes.number,
  }

  static defaultProps = {
    symbolCounts: [],
  }

  /**
   * Initiailize the vis components when the component is about to mount
   */
  componentWillMount() {
    this.visComponents = this.makeVisComponents(this.props);
  }

  /**
   * When the react component mounts, setup the d3 vis
   */
  componentDidMount() {
    this.setup();
  }

  /**
   * When new props are received, regenerate vis components if necessary
   */
  componentWillReceiveProps(nextProps) {
    // regenerate the vis components if the relevant props change
    this.visComponents = this.makeVisComponents(nextProps);
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    this.update();
  }

  /**
   * Figure out what is needed to render the chart
   * based on the props of the component
   */
  makeVisComponents(props) {
    const xScale = d3.scale.linear();
    return {
      xScale,
    };
  }

  /**
   * Update the d3 chart - this is the main drawing function
   */
  update() {
    // this.renderAxes();
    // this.renderAnnotationLines();
    // this.renderLines();
  }

  render() {
    return (
      <div className="SymbolTreemap">
      tree
      </div>
    );
  }

}
