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

  setup() {

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
    symbolCounts.unshift({ name: 'root' });

    const stratify = d3.stratify()
      .id((d) => d.name)
      .parentId((d, i) => {
        return (i === 0) ? '' : 'root';
      });

    const tree = stratify(symbolCounts)
      .sum((d) => d.count)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    console.log(tree)
    const treemap = d3.treemap()
      .size([width, height])
      .tile(d3.treemapResquarify.ratio(1))
      .padding(1)
      .round(true);
    const pack = d3.pack()
      .size([width, height]);
      // .radius((d) => d.data.count);

    const xScale = d3.scaleLinear();
    return {
      xScale,
      tree,
      treemap,
      pack,
      width,
      height,
    };
  }



  /**
   * Update the d3 chart - this is the main drawing function
   */
  update() {
    // this.renderTreemap();
    // this.renderPack();
    this.renderTreeimages();
  }

  renderPack() {
    const { tree, pack } = this.visComponents;

    pack(tree);

    const svg = d3.select(this.root);
    const cell = svg.selectAll('g')
      .data(tree.leaves())
      // .enter().append('g')
      //   .attr('transform', (d) => `translate(${d.x},${d.y})`);
      .enter().append('circle')
        .attr('fill', '#ddd')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', (d) => d.r);
  }

  renderTreeimages() {
    const { tree, treemap } = this.visComponents;
    treemap(tree);

    const svg = d3.select(this.root);

    const cell = svg.selectAll('g')
      .data(tree.leaves())
      .enter().append('g')
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`);
    cell.append('image')
        .attr('id', (d) => `rect-${d.data.id}`)
        .attr('width', (d) => `${d.x1 - d.x0}`)
        .attr('height', (d) => `${d.y1 - d.y0}`)
        .attr('xlink:href', (d) => `/symbols/${d.data.id}.png`);
  }

  renderTreemap() {
    const { tree, treemap } = this.visComponents;
    treemap(tree);

    const svg = d3.select(this.root);

    const cell = svg.selectAll('g')
      .data(tree.leaves())
      .enter().append('g')
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
        .attr('id', (d) => `rect-${d.id}`)
        .attr('width', (d) => `${d.x1 - d.x0}`)
        .attr('height', (d) => `${d.y1 - d.y0}`)
        .style('fill', 'grey');

    cell.append('clipPath')
        .attr('id', (d) => 'clip-' + d.id)
      .append('use')
        .attr('xlink:href', (d) => `#rect-${d.id}`);

    cell.append('text')
        .attr('clip-path', function(d) { return 'url(#clip-' + d.id + ')'; })
        .attr('x', 4)
        .attr('y', 24)
        .text((d) => d.data.name);
  }

  render() {
    const { height, width } = this.props;

    return (
      <div>
        <svg
          className="line-chart chart"
          height={height}
          ref={node => { this.root = node; }}
          width={width}
        />
      </div>
    );
  }

}
