# MEAN boilerplate / example app

This project uses:
* **M**ongo 4
* **E**xpress 4
* **A**ngular 6
* **N**ode 8

Additionally, it supports and/or provides examples of:
* Pug templates instead of HTML
  * **NOTE**: in `.pug` files, you'll often need to comma-separate element attributes for them to parse correctly due
  to the way Angular 2+ uses punctuation (`*()[]`) in attribute names.
* Sass (scss) styles instead of CSS
* TypeScript for both client and server code
* Sharing modules between client and server
* DRY definition of Mongoose models and corresponding Typescript classes (via [Typegoose](https://github.com/szokodiakos/typegoose))
* DRY CRUD entity controllers via inheritance (server-side)
* Page refreshes at arbitrary client paths
* Promise-based Express routes (via [express-promise-router](https://github.com/express-promise-router/express-promise-router))
* Angular Material layout and components


## Installation

* install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
* install Node 8: `nvm install v8`
* set Node 8 as your default (*unless you know you don't want that*): `nvm alias default v8`
* upgrade npm to v6: `npm install -g npm@6.x`
* install [Mongo 4](https://www.mongodb.com/download-center?jmp=nav#community), but don't set it up to run on boot
(*unless you know you want that*)
* install dependencies: `npm install`


## Development server

Run `npm run start` for a dev server (it will build automatically by default). Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

### Flags
**Note**: When using an `npm run <blah>` script, any CLI parameters passed in are destined for `npm` unless preceded
by an extra `--`. For example: `npm run <blah> --npm-flag-1 --npm-flag-2 -- --script-flag-1 --script-flag-2`.
* `--port <port>` will override the default server port (`4200`)
* `--no-mongod` will skip running mongod (use this if you're running mongod externally).
* `--prod` will give you a production build and server (optimized code, no sourcemaps, angular files served statically by
node, etc)
* `--no-build` will skip the build step
* `--no-clean` will skip deleting old build files in the build step
* `--bare` will only start the node server; it assumes the code has already been build, expects the environment to be 
set via `NODE_ENV`, and skips a couple other minor steps normally executed when running locally.  This is intended to be
used in the context of a deployed server, not local testing.


## Ng code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use 
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

**NOTE**: auto-generated files from the above commands may need to be moved from their default location in order to match
the file structure used in this project

**NOTE**: `ng generate component`, will generate component templates with `.html` instead of `.pug`; you'll have to rename
them to use Pug syntax


## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. (This is not generally
not necessary to do manually.)

### Flags
**Note**: When using an `npm run <blah>` script, any CLI parameters passed in are destined for `npm` unless preceded
by an extra `--`. For example: `npm run <blah> --npm-flag-1 --npm-flag-2 -- --script-flag-1 --script-flag-2`.
* `--prod` will do a production build (optimized code, no sourcemaps, etc)
* `--clean` will delete old build files before building


## Running tests

Run `npm run test` to execute client unit tests via [Karma](https://karma-runner.github.io) and end-to-end tests via
[Protractor](http://www.protractortest.org/).


## Linting

Run `npm run lint` to lint client and server TypeScript files.


## Attributions

The "book" examples used here are derived from the 
[MEAN Stack Angular 6 CRUD Web Application](https://www.djamware.com/post/5b00bb9180aca726dee1fd6d/mean-stack-angular-6-crud-web-application) 
article.

Some code patterns used here are based on those found elsewhere (however no substantial portions
of the originating code are used).  Those inspirational sources are:
* https://github.com/leota/MEAN-stack-authentication


## TO-DO

* better form error messages
* server-side pagination/filtering/ordering
* inheritance-based client services
* multiple app entry points
* authentication
* permission-based routes
* toast
* loading spinner
* cordova wrapper
* fix tests

## License

MIT License

Copyright (c) 2018 [Stimulating Solutions, LLC](https://www.stimulating-solutions.com/) <contact@stimulating-solutions.com>.
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
