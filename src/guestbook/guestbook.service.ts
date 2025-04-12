import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guestbook } from './guestbook.entity';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GuestbookService {
  constructor(
    @InjectRepository(Guestbook)
    private guestbookRepository: Repository<Guestbook>,
    private configService: ConfigService,
  ) {}

  async create(dto: CreateGuestbookDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const entry = this.guestbookRepository.create({
      name: dto.name,
      message: dto.message,
      password: hashed,
    });
    const result = await this.guestbookRepository.save(entry);
    return { message: '방명록이 저장되었습니다.', data: result };
  }

  async findAll() {
    return this.guestbookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async deleteEntry(id: number, password: string) {
    const entry = await this.guestbookRepository.findOneBy({ id });
    const masterKey = this.configService.get<string>('MASTER_PASSWORD');

    if (!entry) {
      throw new Error('해당 ID의 방명록이 존재하지 않습니다.');
    }
    const isMatch = await bcrypt.compare(password, entry.password);
    const isAdmin = password === masterKey;

    if (isMatch || isAdmin) {
      await this.guestbookRepository.delete(id);
      return { message: '방명록이 삭제되었습니다.' };
    } else {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
  }
}
