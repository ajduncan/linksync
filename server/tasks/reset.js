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

// Resets the database and creates default settings.

const models = require('../models/');

models(function (err, db) {
  if (err) throw err;

  db.drop().then(function() {
    db.sync().then(function() {
      db.models.link.create({
        url: "https://github.com/ajduncan/linksync/", description: "LinkSync"
      }).then(function(link) {
        console.log("Done!");
      });
    });
  });
});
