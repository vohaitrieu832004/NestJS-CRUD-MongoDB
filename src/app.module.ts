import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module.js';
import { CandidateNotesModule } from './candidate-notes/candidate-notes.module.js';
import { NoteFormatterModule } from './note-formatter/note-formatter.module.js';
import { NotesModule } from './notes/notes.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { validateEnv } from './config/validate-env.js';
import { APP_FILTER } from '@nestjs/core';
import { LoggingExceptionFilter } from './common/logging-exception.filter.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('connection_string'),
      }),
    }),
    ProductsModule,
    CandidateNotesModule,
    NoteFormatterModule,
    NotesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: LoggingExceptionFilter }],
})
export class AppModule {}