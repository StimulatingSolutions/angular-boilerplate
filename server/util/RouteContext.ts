import {Request, Response} from 'express'

type MethodType = 'all' | 'get' | 'post' | 'put' | 'delete';
type RouteHandler =  (req: Request, res: Response) => (Promise<string|void>);


class RouteContext {
  handlers: RouteHandler[];
  method: MethodType;
  path: string;
  middleware: RouteHandler[];

  constructor(method: MethodType, path: string, handler: RouteHandler | RouteHandler[], middleware: RouteHandler | RouteHandler[] = null) {
    this.method = method;
    this.path = path;
    this.handlers = (typeof handler === 'function') ? [handler] : handler;
    this.middleware = (typeof middleware === 'function') ? [middleware] : (middleware == null ? [] : middleware);
  }
}

export { RouteContext, MethodType, RouteHandler };
