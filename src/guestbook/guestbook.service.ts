import { Injectable } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';

export interface GuestbookEntry extends CreateGuestbookDto {
  id: number;
}

@Injectable()
export class GuestbookService {
  private readonly guestbooks: GuestbookEntry[] = [];

  create(dto: CreateGuestbookDto) {
    const entry = { id: Date.now(), ...dto };
    this.guestbooks.push(entry);
    return {
      message: '방명록이 저장되었습니다.',
      data: entry,
    };
  }

  // (선택) 전체 조회
  findAll() {
    return this.guestbooks;
  }
}
