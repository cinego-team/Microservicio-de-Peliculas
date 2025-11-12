import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeliculaModule } from './pelicula/pelicula.module';
import { EstadoModule } from './estado/estado.module';
import { ClasificacionModule } from './clasificacion/clasificacion.module';
import { IdiomaModule } from './idioma/idioma.module';
import { GeneroModule } from './genero/genero.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { Idioma } from './entities/idioma.entity';
import { Genero } from './entities/genero.entity';
import { Estado } from './entities/estado.entity';
import { Clasificacion } from './entities/clasificacion.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'mspeliculas',
        username: 'postgres',
        password: 'grupou',
        entities: [Pelicula, Idioma, Genero, Estado, Clasificacion],
        synchronize: true,
    }),
        PeliculaModule,
        IdiomaModule,
        GeneroModule,
        EstadoModule,
        ClasificacionModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

//dejo este aca por las dudas

// imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       database: 'peliculasbd',
//       username: 'postgres',
//       password: 'postgres',
//       entities: [Pelicula, Idioma, Genero, Estado, Clasificacion],
//       synchronize: true,
//     }),
//     PeliculaModule,
//     IdiomaModule,
//     GeneroModule,
//     EstadoModule,
//     ClasificacionModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],