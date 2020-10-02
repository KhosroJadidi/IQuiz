import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './Navmenu Components/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu props={this.props}/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
