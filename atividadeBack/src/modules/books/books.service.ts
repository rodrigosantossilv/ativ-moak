import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository: Repository<Book>,
    ) { }

    async findAll() {
        const books = await this.bookRepository.find();

        return books;
    }

    async create(book: Book) {
        const createdBook = await this.bookRepository.save(book);

        return createdBook;
    }
    async update(id: number, body: { title: string; year: number }) {
        const bookToUpdate = await this.bookRepository.findOne({ where: { id } });
        if (!bookToUpdate) {
            throw new Error(`Livro não encontrado com o ID ${id}`);
        }

        bookToUpdate.title = body.title;
        bookToUpdate.year = body.year;

        const updatedBook = await this.bookRepository.save(bookToUpdate);

        return updatedBook;
    }
}
