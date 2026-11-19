import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class QueryNoteDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page phải là số nguyên' })
  @Min(1, { message: 'page phải >= 1' })
  page: number = 1; // mặc định 1

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit phải là số nguyên' })
  @Min(1, { message: 'limit phải >= 1' })
  @Max(50, { message: 'limit tối đa là 50' })
  limit: number = 10; // mặc định 10

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'candidateId phải là số nguyên' })
  @Min(1, { message: 'candidateId phải >= 1' })
  candidateId?: number;

  @IsOptional()
  @IsIn(['-createdAt'], { message: 'sort chỉ hỗ trợ: -createdAt' })
  sort?: string;
}