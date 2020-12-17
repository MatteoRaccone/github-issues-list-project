import React from "react";
import { Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import Octicon, { markGithub } from 'octicons-react';

const Header = () => {
    return(
    <Navbar className="header-nav">
    <Octicon className="header-icon" icon={markGithub} />
    <Nav className="mr-auto header-text">
    <Form inline>
      <FormControl type="text" placeholder="Search or jump to..." className="ml-sm-2" />
    </Form>
      <Nav.Link href="#home" className= "header-nav">Pull requests</Nav.Link>
      <Nav.Link href="#features" className= "header-nav">Issues</Nav.Link>
      <Nav.Link href="#pricing" className= "header-nav">Marketplace</Nav.Link>
      <Nav.Link href="#pricing" className= "header-nav">Explore</Nav.Link>
    </Nav>
    </Navbar>
    );
  }
  
  export default Header;