import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IssueListPage from '../containers/IssueListPage';
import IssueDetails from '../containers/IssueDetailPage';
import { Switch, Route, BrowserRouter  } from 'react-router-dom';
import './App.css';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={IssueListPage} />
            <Route path="/:issueId" component={IssueDetails} />
            <Route path="*" component={IssueListPage} />
          </Switch>
        </BrowserRouter>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;