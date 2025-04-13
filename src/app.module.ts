import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GuestbookModule } from './guestbook/guestbook.module';
import { Guestbook } from './guestbook/guestbook.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'guestbook',
      password: 'wedding',
      database: 'guestbook_db',
      entities: [Guestbook],
      synchronize: true, // 개발용만 true
    }),
    GuestbookModule,
  ],
})
export class AppModule {}
