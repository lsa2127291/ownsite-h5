import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from '../reducers/createReducer';
export default initialState => {
  let store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      process.env.NODE_ENV === 'development' && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );
  store.asyncReducers = {};
  return store;
};

export function injectAsyncReucer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
