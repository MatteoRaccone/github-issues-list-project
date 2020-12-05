import React from "react";
import Octicon, { markGithub } from 'octicons-react';
import { Navbar, Nav} from 'react-bootstrap';

const Footer = () => (
  <div className="footer container">
    <Navbar className="footer-nav border-top border-gray-light">
    <Octicon className="footer-icon mr-0" icon={markGithub} />
    <Nav className = "ml-sm-2 mr-0">© 2020 GitHub, Inc.</Nav>
    <Nav.Link href="#home" className="mr-0">Terms</Nav.Link>
    <Nav.Link href="#features" className="mr-0">Privacy</Nav.Link>
    <Nav.Link href="#pricing" className="mr-0">Security</Nav.Link>
    <Nav.Link href="#pricing" className="mr-0">Status</Nav.Link>
    <Nav.Link href="#home" className="mr-0">Help</Nav.Link>
    <Nav.Link href="#features" className="mr-0">Contact GitHub</Nav.Link>
    <Nav.Link href="#pricing" className="mr-0">Pricing</Nav.Link>
    <Nav.Link href="#pricing" className="mr-0">API</Nav.Link>
    <Nav.Link href="#features" className="mr-0">Training</Nav.Link>
    <Nav.Link href="#pricing" className="mr-0">Blog</Nav.Link>
    <Nav.Link href="#pricing" className="mr-0">About</Nav.Link>
    </Navbar>
  </div>
);

export default Footer;