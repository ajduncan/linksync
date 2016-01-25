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

const orm = require('orm');

module.exports = {
  list: function(req, res, next) {
    req.models.link.findAll().then(function(links) {
      res.status(200).json(links);
    }).catch(function(err) {
      return next(err);
    });
  },
  search: function(req, res, next) {
    req.models.link.findAll({
      where: {
        url: { $like: '%' + req.body.url + '%' }
      }
    }).then(function(links) {
      res.status(200).json(links);
    }).catch(function(err) {
      return next(err);
    });
  },
  create: function(req, res, next) {
    req.models.link.create({
      url: req.body.url,
      description: req.body.description
    }).then(function(link) {
      return res.status(200).send(link.serialize());
    }).catch(function(err) {
      return res.status(200).send({ errors: err});
    });
  },
  get: function(req, res, next) {
    req.models.link.findOne({ where: { id: req.params.id } }).then(function(link) {
      return res.status(200).send(link.serialize());
    }).catch(function(err) {
      return next(err);
    });
  },
  delete: function(req, res, next) {
    req.models.link.destroy({ where: { id: req.params.id } }).then(function() {
      return res.status(200).json();
    }).catch(function(err) {
      return next(err);
    });
  }
};
