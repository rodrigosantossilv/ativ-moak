// books.controller.ts
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.entity';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @Post()
    async create(@Body() body: { id: number; title: string; year: number }) {
        try {
            const newBook = new Book(body.id, body.title, body.year);

            const createdBook = await this.booksService.create(newBook);
            return createdBook;

        } catch (error) {
            console.error(error);
            throw error; // Repassa o erro para o NestJS gerenciar
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { title: string; year: number }) {
        try {
            const updatedBook = await this.booksService.update(id, body);

            return updatedBook;

        } catch (error) {
            console.error(error);
            throw error; // Repassa o erro para o NestJS gerenciar
        }
    }
}