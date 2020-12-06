import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IssueListPage from '../containers/IssueListPage';
import { Switch, Route, Redirect, withRouter, BrowserRouter  } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <BrowserRouter>
          <Switch>
              <Route path="/issue-details" component={IssueListPage} />
              <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;