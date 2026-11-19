import { Controller, Get } from '@nestjs/common';
import { CandidateNotesService } from './candidate-notes.service.js';

@Controller('candidate-notes')
export class CandidateNotesController {
    constructor(private readonly candidateNotesService: CandidateNotesService) {}

    @Get()
    findAll() {
        return this.candidateNotesService.findAll();
    }
}
