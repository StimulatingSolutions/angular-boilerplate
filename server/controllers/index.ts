import {Application} from 'express';
import {BookCtrl} from './book.controller';

function registerControllers(app: Application) {
  new BookCtrl().registerRoutes(app);
}

export {registerControllers};
