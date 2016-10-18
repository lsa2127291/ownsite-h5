// import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configStore from './store/configStore';
import {Router, browserHistory} from 'react-router';
import createRoutes from './routes';
const initState = window.INITIAL_STATE;
const store = configStore(initState);
const routes = createRoutes(store);
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('main')
);

