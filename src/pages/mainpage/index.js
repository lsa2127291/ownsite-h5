import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './cotainers/App';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
const store = configStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);

