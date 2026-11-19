import { Injectable } from '@nestjs/common';
import { NoteFormatterService } from '../note-formatter/note-formatter.service.js';
@Injectable()
export class CandidateNotesService {
    constructor(private readonly noteFormatterService: NoteFormatterService) {}
    
    findAll() {
    const notes = [
      'Learn NestJS',
      'Practice Dependency Injection',
    ];

    return notes.map(note => this.noteFormatterService.format(note));
  }
}
