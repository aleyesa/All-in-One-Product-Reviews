'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, express) {
  app.use(express.json());
  app.use(express.static('public'));
};