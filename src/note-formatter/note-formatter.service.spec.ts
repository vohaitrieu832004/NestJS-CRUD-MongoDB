import { Test, TestingModule } from '@nestjs/testing';
import { NoteFormatterService } from './note-formatter.service.js';

describe('NoteFormatterService', () => {
  let service: NoteFormatterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteFormatterService],
    }).compile();

    service = module.get<NoteFormatterService>(NoteFormatterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
