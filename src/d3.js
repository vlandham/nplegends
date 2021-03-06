/**
 * Our local d3 build. Since webpack has `src` configured as a module
 * directory, we can require the output of this in any file by doing
 *
 * import d3 from 'd3';
 *
 * Then we can use it as we expect: d3.scaleLinear, d3.line, etc.
 */
import * as array from 'd3-array';
import * as scale from 'd3-scale';
import * as selection from 'd3-selection';
import * as shape from 'd3-shape';
import * as timeFormat from 'd3-time-format';
import * as axis from 'd3-axis';
import * as collection from 'd3-collection';
import * as hierarchy from 'd3-hierarchy';
import * as force from 'd3-force';
import * as request from 'd3-request';

export default Object.assign({},
  array,
  scale,
  selection,
  shape,
  timeFormat,
  axis,
  collection,
  hierarchy,
  request,
  force);
