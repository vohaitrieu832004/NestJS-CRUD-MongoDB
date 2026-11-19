import { Injectable } from '@nestjs/common';

@Injectable()
export class NoteFormatterService {
  format(note: string) {
    return `[NOTE]: ${note}`;
  }
}