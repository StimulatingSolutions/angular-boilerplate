import * as expressPromise from 'express-promise-router';
const express: any = expressPromise;
const router = express();
import { Book, BookCollection } from '../../shared/models/Book';

/* GET ALL BOOKS */
router.get('/', function(req, res) {
  BookCollection.find()
  .then((books: Book[]) => {
    res.json(books);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res) {
  BookCollection.findById(req.params.id)
  .then((book: Book) => {
    res.json(book);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res) {
  BookCollection.create(req.body)
  .then((book: Book) => {
    res.json(book);
  });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res) {
  BookCollection.findByIdAndUpdate(req.params.id, req.body)
  .then((book: Book) => {
    res.json(book);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res) {
  BookCollection.findByIdAndRemove(req.params.id, req.body)
  .then((book: Book) => {
    res.json(book);
  });
});

export { router as bookRoutes };
