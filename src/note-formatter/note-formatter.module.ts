import { Module } from '@nestjs/common';
import { NoteFormatterService } from './note-formatter.service.js';

@Module({
  providers: [NoteFormatterService],
  exports: [NoteFormatterService],
})
export class NoteFormatterModule {}