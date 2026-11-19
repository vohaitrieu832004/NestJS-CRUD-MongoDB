import {
  Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus, Query, UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { QueryNoteDto } from './dto/query-note.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('notes')
@UseGuards(AuthGuard, RolesGuard) // chạy theo thứ tự: AuthGuard trước, RolesGuard sau
@Roles('recruiter', 'viewer')     // mặc định cả 2 role đều được (đọc)
@ApiTags('notes')
@ApiBearerAuth()

export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAll(@Query() query: QueryNoteDto) {
    return this.notesService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @Post()
  @Roles('recruiter') // ghi: chỉ recruiter
  create(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto);
  }

  @Patch(':id')
  @Roles('recruiter')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('recruiter')
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}