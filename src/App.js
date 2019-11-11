import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import { LocaleProvider } from 'antd';
import esES from 'antd/lib/locale-provider/es_ES';
import 'moment/locale/es';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading,
});

// Pages
const Login = Loadable({
  // loader: () => import('./views/Pages/Login'),
  loader: () => import('./views/summa/login/login'),
  loading,
});

const Registry = Loadable({
  loader: () => import('./views/summa/login/registry'),
  loading,
});

const Recuperar_contraseña = Loadable({
  // loader: () => import('./views/alpha/recuperar_contraseña'),
  loader: () => import('./views/summa/login/recoverPass'),
  loading,
});
const Nueva_contraseña = Loadable({
  // loader: () => import('./views/alpha/nueva_contraseña'),
  loader: () => import('./views/summa/login/newPass'),
  loading,
});

const Auth = Loadable({
  loader: () => import('./containers/authUser'),
  loading,
});

class App extends Component {
  render() {
    const { history, token } = this.props;
    return (
      <Router history={history}>
        <LocaleProvider locale={esES}>
          <Switch>
            <Route path="/logout" component={Auth} />
            <Route path="/AuthUser/:id?" component={Auth} />
            <Route path="/crm/modules/AuthUser/:id?" component={Auth} />
            {/* <Route exact path="/" name="Login Page" component={Login} /> */}
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route
              exact
              path="/registry"
              name="Registro"
              component={Registry}
            />
            <Route
              exact
              path="/recoverPass"
              name="Recuperar contraseña"
              component={Recuperar_contraseña}
            />
            <Route
              exact
              path="/newPass"
              name="Nueva contraseña"
              component={Nueva_contraseña}
            />
            {/* <Route
              exact
              path="/recover/:idEmail?"
              name="Nueva contraseña"
              component={Nueva_contraseña}
            /> */}
            {/* <Route
              exact
              path="/recover/:idEmail?"
              name="Recuperar contraseña"
              component={Recuperar_contraseña}
            /> */}
            <Route path="/" name="Home" component={DefaultLayout} />
            <Route path="/logout" component={Auth} />
            <Route path="/crm/modules/AuthUser/:id?" component={Auth} />
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route
              path="/"
              name="Home"
              render={(props) => (
                <DefaultLayout
                  {...props}
                  authenticated={
                    isString(token) &&
                    isNil(token) === false &&
                    isEmpty(token) === false
                  }
                />
              )}
            />
          </Switch>
        </LocaleProvider>
      </Router>
    );
  }
}

export default App;
