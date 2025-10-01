import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Estado } from '../entities/estado.entity';
import { EstadoController } from './estado.controller';
import { EstadoService } from './estado.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [EstadoService],
})
export class EstadoModule {}
