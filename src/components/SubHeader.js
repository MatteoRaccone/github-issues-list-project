import React, { Component } from 'react';
import { Breadcrumb} from 'react-bootstrap';
import Octicon, { repo } from 'octicons-react'

class SubHeader extends Component {
  render() {
    return(
    <Breadcrumb className ="sub-header">
        <Octicon className="repo-icon" icon={repo} />
        <Breadcrumb.Item href="#">React</Breadcrumb.Item>
        <Breadcrumb.Item active href="#">Dechit</Breadcrumb.Item>
    </Breadcrumb>
    
      );
    }
  }
  
  export default SubHeader;