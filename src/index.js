import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore, { history } from './Store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const { store, persistor } = configureStore();

serviceWorker.register();

const loading = (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        <App history={history} messages={messages} />
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
