#!/usr/bin/env node --harmony

/*
 * linksync -- A multi-platform bookmark, note and media system
 * Copyright (C) 2016 Andrew Duncan
 *
 * This package is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * found in the file LICENSE that should have accompanied this file.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const
  path = require('path'),
  express = require('express'),
  colors = require('colors'),

  settings = require('./config/settings'),
  environment = require('./config/environment'),
  routes = require('./config/routes'),
  models = require('./models/');

module.exports.start = function(done) {
  var app = express();

  environment(app);
  routes(app);

  app.listen(settings.port, function () {
    console.log( ("Listening on port " + settings.port).green );

    if (done) {
      return done(null, app, server);
    }
  }).on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
      console.log('Listening port already in use.'.red);
    }
    if (done) {
      return done(e);
    }
  });
}

if (path.basename(process.argv[1], '.js') == path.basename(__filename, '.js')) {
  module.exports.start()
}
