import { Test, TestingModule } from '@nestjs/testing';
import { CandidateNotesService } from './candidate-notes.service.js';

describe('CandidateNotesService', () => {
  let service: CandidateNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidateNotesService],
    }).compile();

    service = module.get<CandidateNotesService>(CandidateNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
