import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeliculaService } from './pelicula/pelicula.service';
import { PeliculaController } from './pelicula/pelicula.controller';
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
import { IdiomaController } from './idioma/idioma.controller';
import { GeneroController } from './genero/genero.controller';
import { EstadoController } from './estado/estado.controller';
import { ClasificacionController } from './clasificacion/clasificacion.controller';
import { IdiomaService } from './idioma/idioma.service';
import { GeneroService } from './genero/genero.service';
import { EstadoService } from './estado/estado.service';
import { ClasificacionService } from './clasificacion/clasificacion.service';

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
export class AppModule {
}