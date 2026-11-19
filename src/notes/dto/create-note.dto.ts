import { Transform } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @IsInt({ message: 'candidateId phải là số nguyên' })
  candidateId!: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'content phải là chuỗi' })
  @Length(1, 2000, { message: 'content phải từ 1 đến 2000 ký tự' })
  content!: string;
}