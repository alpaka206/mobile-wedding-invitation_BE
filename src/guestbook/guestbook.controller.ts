import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Post()
  create(@Body() dto: CreateGuestbookDto) {
    return this.guestbookService.create(dto);
  }

  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }
}
