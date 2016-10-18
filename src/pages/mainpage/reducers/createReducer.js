import { combineReducers } from 'redux';
import article from './article';
export default (asyncReducers) => combineReducers({
  article,
  ...asyncReducers
});
