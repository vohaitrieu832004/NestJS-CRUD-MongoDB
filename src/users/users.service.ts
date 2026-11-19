import { Injectable, type OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, type Role } from './entities/user.schema.js';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    const seeds: { username: string; password: string; role: Role }[] = [
      { username: 'recruiter1', password: 'Recruiter@123', role: 'recruiter' },
      { username: 'viewer1', password: 'Viewer@123', role: 'viewer' },
    ];

    for (const seed of seeds) {
      const exists = await this.userModel.findOne({ username: seed.username });
      if (!exists) {
        await this.userModel.create({
          username: seed.username,
          passwordHash: await bcrypt.hash(seed.password, 10), // chỉ lưu bản băm
          role: seed.role,
        });
      }
    }
  }

  // Phải gọi +passwordHash vì schema đã ẩn trường này
  findByUsername(username: string) {
    return this.userModel.findOne({ username }).select('+passwordHash');
  }
}