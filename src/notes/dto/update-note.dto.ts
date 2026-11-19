import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsInt({ message: 'candidateId phải là số nguyên' })
  candidateId?: number;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'content phải là chuỗi' })
  @Length(1, 2000, { message: 'content phải từ 1 đến 2000 ký tự' })
  content?: string;
}