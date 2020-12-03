import React from "react";
import Octicon, { markGithub } from 'octicons-react';
import { Navbar, Nav} from 'react-bootstrap';

const Footer = () => (
  <div className="footer">
    <Navbar>
    <Octicon className="footer-icon" icon={markGithub} />
    <Nav className = "ml-sm-2">© 2020 GitHub, Inc.</Nav>
    <Nav.Link href="#home">Terms</Nav.Link>
    <Nav.Link href="#features">Privacy</Nav.Link>
    <Nav.Link href="#pricing">Security</Nav.Link>
    <Nav.Link href="#pricing">Status</Nav.Link>
    <Nav.Link href="#home">Help</Nav.Link>
    <Nav.Link href="#features">Contact GitHub</Nav.Link>
    <Nav.Link href="#pricing">Pricing</Nav.Link>
    <Nav.Link href="#pricing">API</Nav.Link>
    <Nav.Link href="#features">Training</Nav.Link>
    <Nav.Link href="#pricing">Blog</Nav.Link>
    <Nav.Link href="#pricing">About</Nav.Link>
    </Navbar>
  </div>
);

export default Footer;