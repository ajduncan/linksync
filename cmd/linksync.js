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
  prettyjson = require('prettyjson'),
  request = require('request');

const API = 'http://localhost:5979';
var program = require('commander');


program
  .command('add [url] [description]')
  .description('Add a url with a description')
  .option("-t, --tag [tag1,tag2,...]", "optional comma separated tag association")
  .action(function(url, description, options) {
    request.post(
      API + '/links',
      {
        formData: {
          url: url,
          description: description
        },
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Link added, response: %s', JSON.stringify(body));
        } else {
          console.log('Error adding link: %s', error);
        }
      }
    );
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ linksync add www.somedomain.biz "some domain that interests me."');
    console.log('    $ linksync add www.someotherdomain.com');
    console.log();
  });

program
  .command('get [id]')
  .description('Get all information about a link by its id')
  .action(function(id, options) {
    request.get(
      API + '/links/' + id,
      {
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(prettyjson.render(body));
        } else {
          console.log('Error fetching link: %s', error);
        }
      }
  )}).on('--help', function() {
      console.log('  Examples:');
      console.log();
      console.log('    $ linksync get 1');
      console.log();
  });

program
  .command('remove [id]')
  .description('Remove a url by id')
  .action(function(id, options) {
    request.del(
      API + '/links/' + id,
      {
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Link removed, response: %s', JSON.stringify(body));
        } else {
          console.log('Error removing link: %s', error);
        }
      }
    );
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ linksync remove 1');
    console.log();
  });

program
  .command('find [url]')
  .description('Find links saved to the system that are similar to [url]')
  .action(function(url, options) {
    request.post(
      API + '/links/search/',
      {
        formData: {
          url: url,
        },
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(prettyjson.render(body));
          // console.log('Links: %s', JSON.stringify(body));
        } else {
          console.log('Error listing links: %s', error);
        }
      }
    );
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ linksync find somedomain');
    console.log();
  });

program
  .command('tags')
  .description('Manage tags saved to the system')
  .option("-a, --add [tag1,tag2,...]", "add comma separated tags")
  .option("-g, --get [id]", "get a tag by id")
  .option("-d, --delete [id]", "delete tag by id")
  .option("-r, --rename [oldtag] [newtag]", "renames oldtag to newtag")
  .option("-l, --list", "lists tags")
  .action(function(options) {
    var got_option = false;
    if (options.add) {
      got_option = true;
      request.post(
        API + '/tags',
        {
          formData: {
            name: options.add
          },
          json: true
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('Tag(s) added, response: %s', JSON.stringify(body));
          } else {
            console.log('Error adding tags: %s', error);
          }
        }
      );
      console.log('Got option to add tag: %s', options.add);
    }
    if (options.get) {
      got_option = true;
      request.get(
        API + '/tags/' + options.get,
        {
          json: true
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('Response: %s', JSON.stringify(body));
          } else {
            console.log('Error fetching link: %s', error);
          }
      });
    }
    if (options.delete) {
      got_option = true;
      request.del(
        API + '/tags/' + options.delete,
        {
          json: true
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('Link removed, response: %s', JSON.stringify(body));
          } else {
            console.log('Error removing link: %s', error);
          }
      });
    }
    if (options.rename) {
      got_option = true;
      console.log('Got option to rename tag: %s', options.rename);
    }

    if (!got_option) {
      options.list = true;
    }

    if (options.list) {
      request.get(
        API + '/tags',
        {
          json: true
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(prettyjson.render(body));
          } else {
            console.log('Error listing tags: %s', error);
          }
        }
      );
    }
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ linksync tags');
    console.log('    $ linksync tags -a tech,news,investing,sports');
    console.log('    $ linksync tags -d tech');
    console.log('    $ linksync tags -r news technews');
    console.log();
  });

program
  .command('list')
  .description('List links saved to the system')
  .action(function(options) {
    request.get(
      API + '/links',
      {
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(prettyjson.render(body));
        } else {
          console.log('Error listing links: %s', error);
        }
      }
  )}).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ linksync list');
    console.log();
  });


program.parse(process.argv);
