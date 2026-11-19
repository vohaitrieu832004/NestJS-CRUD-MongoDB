import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'notes',
  versionKey: false,
  timestamps: true, // tự thêm createdAt, updatedAt
})
export class Note extends Document {
  @Prop({ type: Number, required: true })
  candidateId: number;

  @Prop({ type: String, required: true, trim: true, maxlength: 2000 })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
// Lọc theo candidateId, rồi sort createdAt giảm, _id giảm
NoteSchema.index({ candidateId: 1, createdAt: -1, _id: -1 });