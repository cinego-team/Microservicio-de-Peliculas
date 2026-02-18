import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeliculaModule } from './pelicula/pelicula.module';
import { EstadoModule } from './estado/estado.module';
import { ClasificacionModule } from './clasificacion/clasificacion.module';
import { GeneroModule } from './genero/genero.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { Genero } from './entities/genero.entity';
import { Estado } from './entities/estado.entity';
import { Clasificacion } from './entities/clasificacion.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: Number(process.env.PUERTO_BD),
            database: process.env.PG_DATABASE_MS_PELICULAS,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            synchronize: true,
            entities: [Pelicula, Genero, Estado, Clasificacion],
        }),
        PeliculaModule,
        GeneroModule,
        EstadoModule,
        ClasificacionModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }