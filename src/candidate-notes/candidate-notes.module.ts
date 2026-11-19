import { Module } from '@nestjs/common';
import { CandidateNotesController } from './candidate-notes.controller.js';
import { CandidateNotesService } from './candidate-notes.service.js';
import {NoteFormatterModule} from "../note-formatter/note-formatter.module.js";

@Module({
  imports: [NoteFormatterModule],
  controllers: [CandidateNotesController],
  providers: [CandidateNotesService]
})
export class CandidateNotesModule {}
