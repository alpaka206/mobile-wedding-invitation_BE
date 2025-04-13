import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestbookService } from './guestbook.service';
import { GuestbookController } from './guestbook.controller';
import { Guestbook } from './guestbook.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Guestbook]), ConfigModule],
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class GuestbookModule {}
