import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Articles from './screens/Articles';
import Bar from './screens/Bar';
import store from './store/store';
import './styles/index.css';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/articles' component={Articles} />
        <Route path='/bar' component={Bar} />
      </Switch>
    </BrowserRouter>
  </Provider>
),
  document.getElementById('root')
);

