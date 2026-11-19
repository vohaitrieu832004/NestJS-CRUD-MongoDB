import { Test } from '@nestjs/testing';
import { ValidationPipe, type INestApplication } from '@nestjs/common';
import request from 'supertest';
import { NotesModule } from '../src/notes/notes.module.js';

describe('Notes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [NotesModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterEach(() => app.close());

  const post = (body: object) => request(app.getHttpServer()).post('/api/notes').send(body);

  it('content rỗng → 400', async () => {
    const res = await post({ candidateId: 1, content: '   ' });
    expect(res.status).toBe(400);
  });

  it('content quá dài → 400', async () => {
    const res = await post({ candidateId: 1, content: 'a'.repeat(2001) });
    expect(res.status).toBe(400);
  });

  it('trường lạ → 400', async () => {
    const res = await post({ candidateId: 1, content: 'ok', role: 'admin' });
    expect(res.status).toBe(400);
  });

  it('hợp lệ → 201 và content được trim', async () => {
    const res = await post({ candidateId: 1, content: '  hi  ' });
    expect(res.status).toBe(201);
    expect(res.body.content).toBe('hi');
  });

  it('PATCH body rỗng → 400', async () => {
    const created = await post({ candidateId: 1, content: 'gốc' });
    const res = await request(app.getHttpServer()).patch(`/api/notes/${created.body.id}`).send({});
    expect(res.status).toBe(400);
  });

  it('PATCH chỉ content → candidateId không mất', async () => {
    const created = await post({ candidateId: 5, content: 'gốc' });
    const res = await request(app.getHttpServer())
      .patch(`/api/notes/${created.body.id}`)
      .send({ content: 'mới' });
    expect(res.body.candidateId).toBe(5);
    expect(res.body.content).toBe('mới');
  });

  it('note không tồn tại → 404', async () => {
    const res = await request(app.getHttpServer()).get('/api/notes/999');
    expect(res.status).toBe(404);
  });
});