import React, { PureComponent, PropTypes } from 'react';

import d3 from 'd3';

import './SymbolForce.scss';

export default class SymbolTreemap extends PureComponent {
  static propTypes = {
    height: React.PropTypes.number,
    onClick: PropTypes.func,
    symbolCounts: PropTypes.array,
    width: React.PropTypes.number,
  }

  static defaultProps = {
    symbolCounts: [],
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.ticked = this.ticked.bind(this);
    this.onSymbolClick = this.onSymbolClick.bind(this);
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

  onSymbolClick(d) {
    const { onClick } = this.props;
    if (onClick) {
      onClick(d);
    }
  }

  setup() {
    const svg = d3.select(this.root);
    this.nodes = svg.append('g')
      .attr('class', 'nodes');

    this.update();
  }

  ticked() {
    this.nodes.selectAll('.node')
      .attr('x', (d) => d.x - (d.r / 2))
      .attr('y', (d) => d.y - (d.r / 2));
  }


  /**
   * Figure out what is needed to render the chart
   * based on the props of the component
   */
  makeVisComponents(props) {
    const { width, height, symbolCounts } = props;
    if (symbolCounts.length === 0) {
      return {};
    }

    const simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(0.02))
      .force('y', d3.forceY().strength(0.10))
      .force('center', d3.forceCenter().x(width / 2).y(height / 2))
      .force('collide', d3.forceCollide().radius((d) => (d.r / 2) + 10).iterations(2));


    const xExtent = d3.extent(symbolCounts, (d) => d.count);

    const rScale = d3.scaleLinear()
      .domain(xExtent)
      .range([20, 80]);

    symbolCounts.forEach((s) => {
      s.r = rScale(s.count);
    });

    return {
      rScale,
      simulation,
      width,
      height,
      symbolCounts,
    };
  }

  /**
   * Update the d3 chart - this is the main drawing function
   */
  update() {
    // this.renderTreemap();
    // this.renderPack();
    this.renderSimulation();
  }

  renderSimulation() {
    const { simulation, symbolCounts } = this.visComponents;

    if (!symbolCounts) {
      return;
    }

    const node = this.nodes
      .selectAll('.node')
      .data(symbolCounts)
      .enter()
      // .append('g')
      // .attr('class', 'node');
      .append('image')
      .attr('class', 'node')
      .attr('width', (d) => d.r)
      .attr('height', (d) => d.r)
      .attr('xlink:href', (d) => `/symbols/${d.id}.png`)
      .on('click', this.onSymbolClick);

    simulation
      .nodes(symbolCounts)
      .on('tick', this.ticked);
  }


  render() {
    const { height, width } = this.props;

    return (
      <div className="SymbolForce">
        <svg
          className="force-chart"
          height={height}
          ref={node => { this.root = node; }}
          width={width}
        />
      </div>
    );
  }

}
