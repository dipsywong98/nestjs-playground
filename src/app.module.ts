import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ContactsModule,
    BooksModule,
    ContactsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'nestjs',
      username: 'root',
      password: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CatsController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
