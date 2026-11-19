import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';
import type { Model } from 'mongoose';
import { Note } from './entities/note.schema.js';
import type { CreateNoteDto } from './dto/create-note.dto.js';
import type { UpdateNoteDto } from './dto/update-note.dto.js';
import type { QueryNoteDto } from './dto/query-note.dto.js';
@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  // Kiểm tra ID sai định dạng → 400 (chạy trước khi truy vấn)
  private checkId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID không hợp lệ: ${id}`);
    }
  }

  async findAll(query: QueryNoteDto) {
    const { page, limit, candidateId } = query;

    // Tự dựng filter từ các trường đã được kiểm tra, không đưa query thô vào MongoDB
    const filter: { candidateId?: number } = {};
    if (candidateId !== undefined) filter.candidateId = candidateId;

    const [items, total] = await Promise.all([
      this.noteModel
        .find(filter)
        .sort({ createdAt: -1, _id: -1 }) // mới nhất trước, _id phá thế hòa
        .skip((page - 1) * limit)
        .limit(limit),
      this.noteModel.countDocuments(filter), // đếm theo CÙNG filter
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    this.checkId(id);
    const note = await this.noteModel.findById(id);
    if (!note) {
      throw new NotFoundException(`Không tìm thấy note với id ${id}`);
    }
    return note;
  }

  create(data: CreateNoteDto) {
    return this.noteModel.create(data);
  }

  async update(id: string, data: UpdateNoteDto) {
    this.checkId(id);

    // Chỉ lấy các trường client có gửi lên
    const changes: Partial<CreateNoteDto> = {};
    if (data.candidateId !== undefined) changes.candidateId = data.candidateId;
    if (data.content !== undefined) changes.content = data.content;

    if (Object.keys(changes).length === 0) {
      throw new BadRequestException('Cần gửi ít nhất candidateId hoặc content');
    }

    const note = await this.noteModel.findByIdAndUpdate(id, changes, {
      new: true,           // trả về bản ghi SAU khi sửa
      runValidators: true, // schema cũng kiểm tra khi update
    });
    if (!note) {
      throw new NotFoundException(`Không tìm thấy note với id ${id}`);
    }
    return note;
  }

  async delete(id: string): Promise<void> {
    this.checkId(id);
    const note = await this.noteModel.findByIdAndDelete(id);
    if (!note) {
      throw new NotFoundException(`Không tìm thấy note với id ${id}`);
    }
  }
}