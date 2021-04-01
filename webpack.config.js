'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'js.bundle.js',
    path: __dirname + '/js',
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
