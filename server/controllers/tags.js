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
  q = require('q'),
  orm = require('orm');


module.exports = {
  list: function(req, res, next) {
    req.models.tag.findAll().then(function(tags) {
      res.status(200).json(tags);
    }).catch(function(err) {
      return next(err);
    });
  },
  search: function(req, res, next) {
    req.models.tag.findAll({
      where: {
        name: { $like: '%' + req.body.name + '%' }
      }
    }).then(function(tags) {
      res.status(200).json(tags);
    }).catch(function(err) {
      return next(err);
    });
  },
  create: function(req, res, next) {
    // handle comma separated adding of tag names
    q.all(req.body.name.split(",").map(function(name) {
      return req.models.tag.create({
        name: name
      }).then(function(tag) { return tag.serialize(); });
    })).then(function(tags) {
      return res.status(200).send(tags);
    }).catch(function(err) {
      // this is interesting, some promises would have been created,
      // but one might fail!
      return res.status(200).send({ errors: err});
    });
  },
  get: function(req, res, next) {
    req.models.tag.findOne({ where: { id: req.params.id } }).then(function(tag) {
      return res.status(200).send(tag.serialize());
    }).catch(function(err) {
      return next(err);
    });
  },
  delete: function(req, res, next) {
    req.models.tag.destroy({ where: { id: req.params.id } }).then(function() {
      return res.status(200).json();
    }).catch(function(err) {
      return next(err);
    });
  }
};
