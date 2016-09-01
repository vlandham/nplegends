import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';

import config from '../../config';

import '../../assets/base.scss';
import './App.scss';

function mapStateToProps() {
  return {
  };
}

class App extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: React.PropTypes.func,
    info: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

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
