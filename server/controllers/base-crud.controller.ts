import * as createError from 'http-errors';
import * as mongoose from 'mongoose';
import { InstanceType } from 'typegoose';
import { Request, Response, Application, Router } from 'express';
import { RouteContext } from '../util/RouteContext';
import * as expressPromise from 'express-promise-router';
import { PaginationOptions } from '../../shared/util/PaginationOptions';

const express: any = expressPromise;


abstract class BaseCrudCtrl<T> {

  public static NEXT: Promise<string> = Promise.resolve('next');

  protected abstract model: mongoose.Model<InstanceType<T>> & T;
  protected abstract path: string;
  protected abstract buildFilterConditions: (params: any) => any;
  protected registeredRoutes: { [key: string]: RouteContext };

  constructor() {
    this.registeredRoutes = {};
    this.registeredRoutes.list = new RouteContext('get', '/', [this.count, this.getPageList, this.getList], [this.setCountOption, this.setPaginationOptions]);
    this.registeredRoutes.get = new RouteContext('get', '/:id', this.get);
    this.registeredRoutes.insert = new RouteContext('post', '/', this.insert);
    this.registeredRoutes.update = new RouteContext('put', '/:id', this.update);
    this.registeredRoutes.delete = new RouteContext('delete', '/:id', this.delete);
  }

  setPaginationOptions = (req: Request, res: Response): Promise<string> => {
    if (!req.query['~pageSize']) {
      return BaseCrudCtrl.NEXT;
    }
    const pagination: PaginationOptions = new PaginationOptions();
    pagination.pageSize = parseInt(req.query['~pageSize'], 10);
    pagination.pageIndex = parseInt(req.query['~pageIndex'], 10);
    pagination.sort = req.query['~sort'];
    pagination.sortDirection = req.query['~sortDirection'];
    delete req.query['~pageSize'];
    delete req.query['~pageIndex'];
    delete req.query['~sort'];
    delete req.query['~sortDirection'];
    const filterParams = {};
    for (const param of Object.keys(req.query)) {
      if (!param.startsWith('~filter.')) {
        continue;
      }
      filterParams[param.substr(8)] = req.query[param];
      delete req.query[param];
    }
    pagination.filters = this.buildFilterConditions(filterParams);
    req.pagination = pagination;
    return BaseCrudCtrl.NEXT;
  };

  setCountOption = (req: Request, res: Response): Promise<string> => {
    if (!req.query['~countOnly']) {
      return BaseCrudCtrl.NEXT;
    }
    delete req.query['~countOnly'];
    req.countOnly = true;
    return BaseCrudCtrl.NEXT;
  };

  registerRoutes(app: Application): void {
    const router: Router = express();
    for (const routeName of Object.keys(this.registeredRoutes)) {
      const route: RouteContext = this.registeredRoutes[routeName];
      for (const handler of route.handlers) {
        router[route.method](route.path, ...route.middleware, handler);
      }
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

  // Get list
  getList = (req: Request, res: Response): Promise<void> => {
    return this.model.find()
    .then((all: T[]) => {
      res.json(all);
    });
  };

  // Get a single page list
  getPageList = (req: Request, res: Response): Promise<void | string> => {
    if (!req.pagination) {
      return BaseCrudCtrl.NEXT;
    }
    const filters = req.pagination.filters || {};
    const pagePromise = this.model.find(filters)
    .limit(req.pagination.pageSize)
    .skip(req.pagination.pageIndex * req.pagination.pageSize)
    .sort((req.pagination.sortDirection === 'desc' ? '-' : '') + req.pagination.sort);
    const countPromise = this.model.count(filters);

    return Promise.all([pagePromise, countPromise])
    .then((results: any[]) => {
      res.json({page: results[0], total: results[1]});
    });
  };

  // Count
  count = (req: Request, res: Response): Promise<void | string> => {
    if (!req.countOnly) {
      return BaseCrudCtrl.NEXT;
    }
    if (!req.pagination || !req.pagination.filters) {
      return this.model.estimatedDocumentCount()
      .then((count: number) => {
        res.json(count);
      });
    }
    return this.model.count(req.pagination.filters)
    .then((total: number) => {
      res.json(total);
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

export default BaseCrudCtrl;
