import {Request, Response} from 'express'

type MethodType = 'all' | 'get' | 'post' | 'put' | 'delete';

class RouteContext {
  handler: (req: Request, res: Response) => Promise<void>;
  method: MethodType;
  path: string;

  constructor(method: MethodType, path: string, handler: (req: Request, res: Response) => Promise<void>) {
    this.method = method;
    this.path = path;
    this.handler = handler;
  }
}

export { RouteContext, MethodType };
