import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import SignInScreen from './screens/public/SignIn';
import SignUpScreen from './screens/public/SignUp';
import store from './store/store';
import './styles/index.css';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* <Route path='/password/forgot' component={ForgotPasswordScreen} />
        <Route path='/password/reset' component={ResetPasswordScreen} />
        <Route path='/login/2fa/check' component={Check2FAScreen} /> */}

        <Route path='/' exact component={App} />
        <Route path='/account' component={App} />
        <Route path='/search' component={App} />
        <Route path='/login' component={SignInScreen} />
        <Route path='/signup' component={SignUpScreen} />
      </Switch>
    </BrowserRouter>
  </Provider>
),
  document.getElementById('root')
);

