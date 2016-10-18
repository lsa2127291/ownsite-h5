if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
export default function createRoutes (store) {
  return {
    path: 'blog',
    getComponents (location, cb) {
      require.ensure(['../components/Blog/Blog'], function () {
        var Blog = require('../components/Blog/Blog').default;
        cb(null, Blog);
      });
    }
  };
}
