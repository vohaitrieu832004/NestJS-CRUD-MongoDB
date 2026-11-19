import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotesService } from './notes.service.js';
import { Note } from './entities/note.schema.js';

const VALID_ID = '64b7f0f0f0f0f0f0f0f0f0f0';

// Model giả, không đụng MongoDB
const mockModel: any = {
  findById: vi.fn(),
  findByIdAndUpdate: vi.fn(),
  findByIdAndDelete: vi.fn(),
};

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    vi.resetAllMocks(); // mỗi test bắt đầu sạch

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getModelToken(Note.name), useValue: mockModel },
      ],
    }).compile();

    service = moduleRef.get(NotesService);
  });

  it('ID sai định dạng → 400', async () => {
    await expect(service.findById('abc')).rejects.toThrow(BadRequestException);
  });

  it('không có dữ liệu → 404', async () => {
    mockModel.findById.mockResolvedValue(null);
    await expect(service.findById(VALID_ID)).rejects.toThrow(NotFoundException);
  });

  it('PATCH rỗng → 400', async () => {
    await expect(service.update(VALID_ID, {})).rejects.toThrow(BadRequestException);
  });

  it('xóa note không tồn tại → 404', async () => {
    mockModel.findByIdAndDelete.mockResolvedValue(null);
    await expect(service.delete(VALID_ID)).rejects.toThrow(NotFoundException);
  });
});