import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Idioma } from '../entities/idioma.entity';
import { IdiomaController } from './idioma.controller';
import { IdiomaService } from './idioma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Idioma])],
  controllers: [IdiomaController],
  providers: [IdiomaService],
  exports: [IdiomaService],
})
export class IdiomaModule {}
