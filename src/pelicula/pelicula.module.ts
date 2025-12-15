import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pelicula } from '../entities/pelicula.entity';
import { Genero } from '../entities/genero.entity';
import { Clasificacion } from '../entities/clasificacion.entity';
import { Estado } from '../entities/estado.entity';

import { PeliculaController } from './pelicula.controller';
import { PeliculaService } from './pelicula.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Pelicula, Genero, Clasificacion, Estado]),
    ],
    controllers: [PeliculaController],
    providers: [PeliculaService],
    exports: [PeliculaService],
})
export class PeliculaModule { }

