import React, { PureComponent, PropTypes } from 'react';

export default class CountInContext extends PureComponent {
  static propTypes = {
    height: React.PropTypes.number,

    parks: PropTypes.array,
    width: React.PropTypes.number,
  }

  static defaultProps = {
    parks: [],
  }

  render() {
    return (
      <div className="CountInContext">
      COUNT
      </div>
    );
  }

}
