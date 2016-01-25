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
  morgan = require('morgan'),
  settings = require('./settings'),
  models = require('../models/');

module.exports = function(app) {
  app.use(morgan("combined", { "stream": settings.logger.stream }));
  app.use(express.static(path.join(settings.path, 'public')));
  app.use(function (req, res, next) {
    models(function (err, db) {
      if (err) {
        return next(err);
      }

      req.models = db.models;
      req.db     = db;

      return next();
    });
  });
};
