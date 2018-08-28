import * as createError from 'http-errors';
import * as mongoose from 'mongoose';
import {InstanceType} from 'typegoose';
import {Request, Response, Application, Router} from 'express'
import {RouteContext} from '../util/RouteContext';
import * as expressPromise from 'express-promise-router';
const express: any = expressPromise;


abstract class BaseCtrl<T> {

  protected abstract model: mongoose.Model<InstanceType<T>> & T;
  protected abstract path: string;
  protected registeredRoutes: { [key: string]: RouteContext };


  constructor() {
    this.registeredRoutes = {};
    this.registeredRoutes.all = new RouteContext('get', '/', this.getAll);
    this.registeredRoutes.get = new RouteContext('get', '/:id', this.get);
    this.registeredRoutes.insert = new RouteContext('post', '/', this.insert);
    this.registeredRoutes.update = new RouteContext('put', '/:id', this.update);
    this.registeredRoutes.delete = new RouteContext('delete', '/:id', this.delete);
  }

  registerRoutes(app: Application) {
    let router: Router = express();
    for (let routeName in this.registeredRoutes) {
      let route: RouteContext = this.registeredRoutes[routeName];
      router[route.method](route.path, route.handler);
    }
    app.use(`/api/${this.path}`, router);
  }

  duplicateKeyHandler(err: any): T {
    // 11000 is the code for duplicate key error
    if (err.code === 11000) {
      throw createError(409);
    }
    throw err;
  }

  // Get all
  getAll = (req: Request, res: Response): Promise<void> => {
    return this.model.find()
    .then((all: T[]) => {
      res.json(all);
    });
  };

  // Count all
  count = (req: Request, res: Response): Promise<void> => {
    return this.model.estimatedDocumentCount()
    .then((count: number) => {
      res.json(count);
    });
  };

  // Insert
  insert = (req: Request, res: Response): Promise<void> => {
    return this.model.create(req.body)
    .catch(this.duplicateKeyHandler)
    .then((doc: T) => {
      res.status(201).json(doc);
    });
  };

  // Get by id
  get = (req: Request, res: Response): Promise<void> => {
    return this.model.findById(req.params.id)
    .then((doc: T) => {
      res.json(doc);
    });
  };

  // Update by id
  update = (req: Request, res: Response): Promise<void> => {
    return this.model.findByIdAndUpdate(req.params.id, req.body)
    .catch(this.duplicateKeyHandler)
    .then((doc: T) => {
      res.json(doc);
    });
  };

  // Delete by id
  delete = (req: Request, res: Response): Promise<void> => {
    return this.model.findByIdAndRemove(req.params.id)
    .then((doc: T) => {
      res.json(doc);
    });
  }

}

export default BaseCtrl;
