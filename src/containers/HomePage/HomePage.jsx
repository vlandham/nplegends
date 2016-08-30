import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import * as SearchActions from '../../redux/search/actions';
import * as SearchSelectors from '../../redux/search/selectors';

import { OmniSearch } from '../../components';

import './HomePage.scss';

function mapStateToProps(state) {
  return {
    parkIds: SearchSelectors.getParkSearch(state),
  };
}

class HomePage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    parkIds: PropTypes.object,
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  fetchData(props) {
    const { dispatch } = props;
    dispatch(SearchActions.fetchParkSearchIfNeeded());
  }

  /**
   * Callback for when viewMetric changes - updates URL
   */
  onSearchQueryChange() {
    // noop
  }

  renderSearch() {
    const { parkIds } = this.props;
    let parks = [];
    if (parkIds) {
      parks = _.values(parkIds);
    }
    return (
      <OmniSearch
        searchResults={parks}
        onSearchChange={this.onSearchQueryChange}
      />
    );
  }

  render() {
    return (
      <div className="home-page">
        <Helmet title="Home" />
        <h1>Home</h1>

        <div className="omni-search-container">
          {this.renderSearch()}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
