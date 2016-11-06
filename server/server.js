import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import cssRequireHook from 'css-modules-require-hook';
import sass from 'node-sass';
import configStore from '../src/pages/mainpage/store/configStore';
import { queryArticles } from '../src/pages/mainpage/actions/article';
import render from './middlewares/koa-react-render';
if (process.env.NODE_ENV === 'development') {
  var listened = false;
  var browserSync = require('browser-sync').create();
}
cssRequireHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: [ '.scss', '.css' ],
  preprocessCss: data => sass.renderSync({ data }).css
});
var app = require('koa')();
var router = require('./middlewares/router');
var createRoutes = require('../src/pages/mainpage/routes').default;
app.use(router.routes()).use(router.allowedMethods());
app.use(render({
  templatesDir: './build/pages/',
  componentsDir: '../../src/pages/'
}));
app.use(function * (next) {
  var location = this.url;
  var store = configStore();
  var routes = createRoutes(store);
  yield store.dispatch(queryArticles());
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      this.status = 500;
      this.body = err;
    } else if (redirectLocation) {
      this.status = 302;
      this.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      this.render(() => <RouterContext {...renderProps} />, store, 'mainpage/index.html');
    } else {
      this.status = 404;
      this.body = 'Not found';
    }
  });
  yield next;
});
app.listen(8000);
if (process.env.NODE_ENV === 'development') {
  if(!listened) {
    browserSync.init({
      proxy: 'localhost:8000',
      browser: 'chrome'
    });
    browserSync.watch('src/pages/**').on('change', browserSync.reload);
    listened = true;
  }
}


