import 'isomorphic-fetch';
import {HOST} from '../../../modules/common/constants';
if (process.env.NODE_ENV !== 'production') {
  require('../../../modules/mock/article/article');
}
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts (articles) {
  return {
    type: RECEIVE_POSTS,
    articles
  };
}
export function queryArticles (page = 1, item = 10) {
  return dispatch => fetch(HOST + '/article/list?page=' + page + '&item=' + item, {
    method: 'GET'
  }).then(res => res.json(), err => {
    console.log('err', err);
  }).then(json => dispatch(receivePosts(json.data.articles)));
}
