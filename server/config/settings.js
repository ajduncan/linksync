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
  logger = require('../util/logger');

const settings = {
  path: path.normalize(path.join(__dirname, '..')),
  port: process.env.NODE_PORT || 5979,
  api: 'http://localhost:5979/',
  logger: logger,
  database: {
    "dialect": "sqlite",
    "storage": "linksync.db",
    "logging": logger.stream.write
  }
};

module.exports = settings;
