import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  // books = BOOKS;
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  getBooks(): Promise<any> {
    return this.bookRepository.find();
    // return new Promise(resolve => {
    //   resolve(this.books);
    // });
  }
  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise(resolve => {
      const book = this.bookRepository.find({ id });
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }
  async addBook(book): Promise<any> {
    return new Promise(async resolve => {
      await this.bookRepository.insert(book);
      resolve(this.bookRepository.find());
    });
  }
  async deleteBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise(async resolve => {
      const book = await this.bookRepository.find({ id });
      await this.bookRepository.remove(book);
      resolve(this.bookRepository.find());
    });
  }
}
