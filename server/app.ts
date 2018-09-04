import * as createError from 'http-errors';
import { Request, Response, Application } from 'express';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

import * as mongoose from 'mongoose';
import { registerControllers } from './controllers';

const app: Application = express();

mongoose.connect('mongodb://localhost/yet-another-mean-boilerplate?retryWrites=true', {
  useNewUrlParser: true,
  promiseLibrary: global.Promise
})
.then(() => {

  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(csurf({cookie: true}));
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
      return next(err);
    }
    // handle CSRF token errors here
    res.status(403);
    res.send('session has expired or form tampered with');
  });
  app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  // main app routes
  registerControllers(app);

  // serve static files
  app.use(express.static(path.join(__dirname, '../client')));

  // 404 any inappropriate API or assets routes
  app.use([`/api/*`, `/assets/*`], function (req: Request, res: Response, next) {
    next(createError(404));
  });

  // for any other routes, serve index.html so Angular can handle client-side routing
  let data;
  let eTag;
  app.use('/', function (req: Request, res: Response, next) {
    if (req.method !== 'GET') {
      return next();
    }

    if (!data) {
      data = fs.readFileSync(path.join(__dirname, '../client/index.html'));
      eTag = crypto.createHash('md5').update(data).digest('hex');
    }

    // if we can get away with a 304 Not Modified response, do that
    if (req.headers['if-none-match'] === eTag) {
      res.writeHead(304, 'Not Modified');
      return res.end();
    }

    // send the actual data instead
    res.writeHead(200, {
      'ETag': eTag,
      'Content-Type': 'text/html'
    });
    return res.end(data);
  });

  // error handler
  app.use(function (err, req: Request, res: Response, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = app.get('env') === 'development' ? err : {};

    if (app.get('env') === 'development' || err.status !== 404) {
      console.error(err);
    }

    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
  });
})
.catch((err) => console.error(err));

export { app };
