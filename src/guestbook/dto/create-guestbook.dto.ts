import { IsString } from 'class-validator';

export class CreateGuestbookDto {
  @IsString()
  name: string;

  @IsString()
  message: string;
}
