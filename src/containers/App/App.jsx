import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Navbar, Nav, NavItem, FormGroup } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';

import _ from 'lodash';

import * as SearchActions from '../../redux/search/actions';
import * as SearchSelectors from '../../redux/search/selectors';

import config from '../../config';

import { OmniSearch } from '../../components';

import '../../assets/base.scss';
import './App.scss';

function mapStateToProps(state) {
  return {
    parkIds: SearchSelectors.getParkSearch(state),
  };
}

class App extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: React.PropTypes.func,
    info: PropTypes.object,
    parkIds: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.fetchData(this.props);
  }

  fetchData(props) {
    const { dispatch } = props;
    dispatch(SearchActions.fetchParkSearchIfNeeded());
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
        width={200}
      />
    );
  }

  renderNav() {
    return (
      <Navbar>
        <Navbar.Header>
          <span className="logo">
            <IndexLink to="/">
              <img className="logo-img" alt="MLab" src="/img/logo_white.png" style={{ height: 60 }} />
            </IndexLink>
          </span>
        </Navbar.Header>
        <Navbar.Form pullRight>
          <FormGroup>
            {this.renderSearch()}
            {/* <FormControl type="text" placeholder="Find a Park" /> */}
          </FormGroup>
        </Navbar.Form>
        <Nav className="pull-right">
          <IndexLinkContainer to="/"><NavItem eventKey={1}>Home</NavItem></IndexLinkContainer>
          <LinkContainer to="/about"><NavItem eventKey={2}>About</NavItem></LinkContainer>
        </Nav>
      </Navbar>
    );
  }


  render() {
    return (
      <div>
        <Helmet {...config.app.head} />
        {this.renderNav()}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
