import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IssueListPage from '../containers/IssueListPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <IssueListPage org="facebook" repo="react"/>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;