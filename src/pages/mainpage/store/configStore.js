import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/root';
export default initialState => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    global.devToolsExtension ? global.devToolsExtension() : f => f
  )
);

