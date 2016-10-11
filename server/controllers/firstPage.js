module.exports = function * (next) {
  console.log('url', this.url);
  yield next;
  this.body = 'cool';
};
