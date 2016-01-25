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
  moment = require('moment'),
  settings = require('../config/settings');

const endpoint = settings.api + 'links/';

module.exports = function(orm) {
  const Link = orm.define('link', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: Sequelize.TEXT, allowNull: false, unique: true },
    description: { type: Sequelize.TEXT, allowNull: false }
  }, {
    hooks: {
    },
    instanceMethods: {
      serialize: function() {
        return {
          id: this.id,
          api: endpoint,
          url: this.url,
          description: this.description,
          createdAt: moment(this.createdAt).fromNow(),
          updatedAt: moment(this.updatedAt).fromNow()
        };
      }
    }
  });
};
