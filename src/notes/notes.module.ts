import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller.js';
import { NotesService } from './notes.service.js';
import { Note, NoteSchema } from './entities/note.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}