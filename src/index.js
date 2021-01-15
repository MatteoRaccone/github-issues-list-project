import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter  } from 'react-router-dom';
import rootReducer from './redux/reducers';
import IssueListPage from './containers/IssueListPage';
import Header from './components/Header';
import Footer from './components/Footer';
import {IssueForm } from './components/IssueForm';
import IssueDetails from './containers/IssueDetailPage';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));



const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/issue/IssueForm" component={IssueForm} />
      <Route path="/issue/:issueId" component={IssueDetails} />
      <Route path="*" component={IssueListPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <Header/>
    {routes}
    <Footer/>
  </Provider>,
  document.getElementById('root')
);

