# linksync #

A multi-platform bookmark, note and media system.

## Running ##

  $ npm install
  $ npm start

## Plugins ##

linksync can use plugins to accomplish various tasks, such as downloading media.

1.  youtube-dl [https://github.com/rg3/youtube-dl/]
2.  ... Play links via vlc using playlists, e.g. http://localhost:5979/audiostreams/vaporwave.pls
3.  ... Open groups of tabs in firefox or chrome, e.g. just open http://localhost:5979/browsergroups/productivity, where productivity is a tag group.
4.  ...

## OSX, Linux Command Line Examples ##

$ linksync add -tags=programming,technology,aggregator https://lobste.rs A technology-focused link-aggregation site.
$ linksync find aggregator
$ linksync list
$ linksync remove https://lobste.rs # or by ID
$ linksync add https://vimeo.com/62232896 Mr. Sprinkles
$ linksync sync 1 # download mr sprinkles media via vimeo plugin

## Layout ##

* / - boilerplate build system
* app - frontend electron application code
* config - environment configs
* build - build folder
* releases - releases ready for installers
* resources - operating system specific resources
* tasks - build and development environment scripts
* server - backend api service
* cmd - global command line utility
