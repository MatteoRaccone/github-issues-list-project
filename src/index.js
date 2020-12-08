import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Breadcrumb} from 'react-bootstrap';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter  } from 'react-router-dom';
import rootReducer from './redux/reducers';
import App from './containers/App';
import IssueListPage from './containers/IssueListPage';
import Header from './components/Header';
import Footer from './components/Footer';
import IssueDetails from './containers/IssueDetailPage';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

let store = createStore(rootReducer, applyMiddleware(thunk));

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/issue" component={App}/>
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

