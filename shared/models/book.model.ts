
// see documentation at https://github.com/szokodiakos/typegoose for available @prop options

import {prop, Typegoose} from 'typegoose';
import * as mongoose from 'mongoose';

class Book extends Typegoose  {

  _id?: mongoose.Types.ObjectId;

  @prop({ required: true, unique: true })
  isbn: string;

  @prop({ required: true, index: true })
  title: string;

  @prop()
  author?: string;

  @prop()
  description?: string;

  @prop()
  published_year?: string;

  @prop()
  publisher?: string;

  @prop({ default: Date.now })
  updated_date?: Date;
}

const BookCollection = new Book().getModelForClass(Book);

export { Book, BookCollection };
