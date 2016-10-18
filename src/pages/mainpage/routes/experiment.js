if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
export default function (store) {
  return {
    path: 'experiment',
    getComponents (location, cb) {
      require.ensure(['../components/Experiment/Experiment'], function () {
        var Experiment = require('../components/Experiment/Experiment').default;
        cb(null, Experiment);
      });
    }
  };
}
