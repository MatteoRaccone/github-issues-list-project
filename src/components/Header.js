import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import Octicon, { markGithub } from 'octicons-react'

class Header extends Component {
  render() {
    return(
    <Navbar className="header-nav">
    <Octicon className="header-icon" icon={markGithub} />
    <Nav className="mr-auto header-text">
    <Form inline>
      <FormControl type="text" placeholder="Search or jump to..." className="ml-sm-2" />
    </Form>
      <Nav.Link href="#home">Pull requests</Nav.Link>
      <Nav.Link href="#features">Issues</Nav.Link>
      <Nav.Link href="#pricing">Marketplace</Nav.Link>
      <Nav.Link href="#pricing">Explore</Nav.Link>
    </Nav>
    </Navbar>
    
      );
    }
  }
  
  export default Header;