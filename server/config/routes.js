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
  multer = require('multer'),
  controllers = require('../controllers');

var upload = multer();

module.exports = function(app) {
  // simple about api page
  app.get('/', upload.array(), controllers.home);

  // links
  app.get('/links', upload.array(), controllers.links.list);
  app.post('/links', upload.array(), controllers.links.create);
  app.get('/links/:id', upload.array(), controllers.links.get);
  app.delete('/links/:id', upload.array(), controllers.links.delete);
  app.post('/links/search/', upload.array(), controllers.links.search);

  // tags
  app.get('/tags', upload.array(), controllers.tags.list);
  app.post('/tags', upload.array(), controllers.tags.create);
  app.get('/tags/:id', upload.array(), controllers.tags.get);
  app.delete('/tags/:id', upload.array(), controllers.tags.delete);
  app.post('/tags/search/', upload.array(), controllers.tags.search);

};
