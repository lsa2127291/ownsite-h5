export const HOST = 'http://lsa2127291.me:8000';
if (process.env.NODE_ENV !== 'production') {
  exports.HOST = 'http://dev.lsa2127291.me:8000';
}
