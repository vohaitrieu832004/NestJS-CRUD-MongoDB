import { SetMetadata } from '@nestjs/common';
import type { Role } from '../users/entities/user.schema.js';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);