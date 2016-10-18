// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import App from '../containers/App';
import FirstPage from '../containers/FirstPage';
export default function (store) {
  return {
    path: '/',
    component: App,
    indexRoute: {component: FirstPage},
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./blog').default(store),
          require('./experiment').default(store)
        ]);
      });
    }
  };
}
