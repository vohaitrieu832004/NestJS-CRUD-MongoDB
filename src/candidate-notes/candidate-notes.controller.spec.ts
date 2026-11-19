import { Test, TestingModule } from '@nestjs/testing';
import { CandidateNotesController } from './candidate-notes.controller.js';

describe('CandidateNotesController', () => {
  let controller: CandidateNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateNotesController],
    }).compile();

    controller = module.get<CandidateNotesController>(CandidateNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
