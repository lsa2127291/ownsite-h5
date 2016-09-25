import { RECEIVE_POSTS } from '../actions/article';
import { combineReducers } from 'redux';

function articleList (state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.articles;
    default:
      return state;
  }
}

const article = combineReducers({
  articleList
});

export default article;
