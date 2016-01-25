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
  Sequelize = require('sequelize'),
  settings = require('../config/settings');

var orm = null;

function setup(orm, cb) {
  // is there any good reason not to just automate this?
  require('./link')(orm);
  require('./tag')(orm);

  return cb(null, orm);
}

module.exports = function (cb) {
  if (orm) {
    return cb(null, orm);
  }

  orm = new Sequelize('linksync', null, null, settings.database);
  setup(orm, cb);
};
