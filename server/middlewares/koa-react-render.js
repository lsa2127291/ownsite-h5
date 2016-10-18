/*
 * koa-react-view.js
 * 提供 react server render 功能
 * {
 *   options : {
 *     templatesDir: '/root/templatesDir'
 *     componentsDir: '/root/components/',                 // the root directory of view files
 *     doctype: '<!DOCTYPE html>',
 *     extname: '.js',                     // view层直接渲染文件名后缀
 *     writeResp: true,                    // 是否需要在view层直接输出
 *     internals: true,                    // 是否使用markup方式渲染（不包含react-data-checksum等react相关属性）
 *   }
 * }
 */
import React from 'react';
import {Provider} from 'react-redux';
import { renderToString, renderToStringMarkup } from 'react-dom/server';
import ejs from 'ejs';
import path from 'path';
import xtpl from 'xtpl';
import _ from 'lodash';
import thunkify from 'thunkify';
module.exports = function (options) {
  return function * (next) {
    // assert(options && options.templatesDir, '[templatesDir] templatesDir is required, please check config!');
    // assert(options.componentsDir, '[componentsDir] componentsDir is required, please check config!');
    this.render = function render (component, store, templateName) {
      if (_.isString(store)) {
        templateName = store;
        store = null;
      }
      var render = options.internals ? renderToStringMarkup : renderToString;
      var Component = _.isFunction(component) ? component : require(path.join(options.componentsDir, component)).default;
      var renderProp = store ? <Provider store={store}><Component /></Provider> : <Component />;
      var html = render(
        renderProp
      );
      var htmlStr;
      // var renderFile = thunkify(xtpl.renderFile);
      // yield htmlStr = renderFile(path.join(options.templatesDir, templateName), {html: html});
      var self = this;
      xtpl.renderFile(path.join(options.templatesDir, templateName), {html: html, initState: JSON.stringify(store.getState())}, function (err, htmlStr) {
        console.log(htmlStr);
        self.body = htmlStr;
      });
      //this.body = htmlStr;
    };
    yield next;
  }
};
