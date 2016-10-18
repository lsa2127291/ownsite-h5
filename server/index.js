import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import cssRequireHook from 'css-modules-require-hook';
import sass from 'node-sass';
import configStore from '../src/pages/mainpage/store/configStore';
import { queryArticles } from '../src/pages/mainpage/actions/article';
//import routes from '../src/pages/mainpage/routes';
import render from './middlewares/koa-react-render';
cssRequireHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: [ '.scss', '.css' ],
  preprocessCss: data => sass.renderSync({ data }).css
});
var app = require('koa')();
var router = require('./middlewares/router');
var createRoutes = require('../src/pages/mainpage/routes').default;
//app.use(router.routes()).use(router.allowedMethods());
app.use(render({
  templatesDir: './build/pages/',
  componentsDir: '../../src/pages/'
}));
app.use(function * () {
      var location = this.url;
      var store = configStore();
      var routes = createRoutes(store);
      yield store.dispatch(queryArticles());
      match({ routes, location }, (err, redirectLocation, renderProps) => {
        if (err) {
          this.status = 500;
          this.body = err;
        } else if (redirectLocation) {
          // res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // console.log(renderProps);
      this.render(() => <RouterContext {...renderProps} />, store, 'mainpage/index.html');
    } else {
      // res.send(404, 'Not found')
    }
  });
});
// router.get('/init', function * (next) {
//  console.log(this.url);
//});
app.listen(8000);
