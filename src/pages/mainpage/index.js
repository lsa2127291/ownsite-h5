import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configStore from './store/configStore';
import {Router, hashHistory} from 'react-router';
import routes from './routes';
const store = configStore();
render(
  <Provider store={store}>
    <Router routes={routes} history={hashHistory} />
  </Provider>,
  document.getElementById('main')
);

