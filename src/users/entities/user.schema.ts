import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type Role = 'recruiter' | 'viewer';

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  username!: string;

  // select: false → mặc định KHÔNG lấy trường này ra khi truy vấn
  @Prop({ type: String, required: true, select: false })
  passwordHash!: string;

  @Prop({ type: String, enum: ['recruiter', 'viewer'], required: true })
  role!: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);