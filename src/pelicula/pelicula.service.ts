import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from '../entities/pelicula.entity';
import { Idioma } from '../entities/idioma.entity';
import { Genero } from '../entities/genero.entity';
import { Clasificacion } from '../entities/clasificacion.entity';
import { Estado } from '../entities/estado.entity';

import { axiosUsuariosClient } from '../../axios_service/axios.client';
import { config } from '../../axios_service/env';
import { PeliculaInput, PeliculaResponse } from './pelicula.dto';

@Injectable()
export class PeliculaService {
    constructor(
        @InjectRepository(Pelicula) private peliculaRepo: Repository<Pelicula>,
        @InjectRepository(Idioma) private idiomaRepo: Repository<Idioma>,
        @InjectRepository(Genero) private generoRepo: Repository<Genero>,
        @InjectRepository(Clasificacion)
        private clasificacionRepo: Repository<Clasificacion>,
        @InjectRepository(Estado) private estadoRepo: Repository<Estado>,
    ) { }

    private toResponse(p: Pelicula): PeliculaResponse {
        return {
            id: p.id,
            titulo: p.titulo,
            director: p.director,
            duracion: p.duracion,
            fechaEstreno: p.fechaEstreno ?? '',
            sinopsis: p.sinopsis ?? '',
            url: p.urlImagen ?? '',
            empleadoResponsable: p.empleadoId,
            idioma: p.idioma?.nombre ?? '',
            genero: p.genero?.nombre ?? '',
            clasificacion: p.clasificacion?.nombre ?? '',
            estado: p.estado?.nombre ?? '',
        };
    }

    private async resolveRelationsByIds(dto: PeliculaInput) {
        const [idioma, genero, clasificacion, estado] = await Promise.all([
            this.idiomaRepo.findOne({ where: { nombre: dto.idioma } }),
            this.generoRepo.findOne({ where: { nombre: dto.genero } }),
            this.clasificacionRepo.findOne({
                where: { nombre: dto.clasificacion },
            }),
            this.estadoRepo.findOne({ where: { nombre: dto.estado } }),
        ]);

        if (!idioma) throw new Error('404 Idioma not found.');
        if (!genero) throw new Error('404 Genero not found.');
        if (!clasificacion) throw new Error('404 Clasificacion not found.');
        if (!estado) throw new Error('404 Estado not found.');

        return { idioma, genero, clasificacion, estado };
    }

    async newPelicula(datos: PeliculaInput): Promise<PeliculaResponse> {
        const rels = await this.resolveRelationsByIds(datos);

        const pelicula = this.peliculaRepo.create({
            titulo: datos.titulo,
            sinopsis: datos.sinopsis,
            director: datos.director,
            duracion: datos.duracion,
            fechaEstreno: datos.fechaEstreno,
            urlImagen: datos.urlImagen,
            ...rels,
        });

        await this.peliculaRepo.save(pelicula);

        const saved = await this.peliculaRepo.findOne({
            where: { id: pelicula.id },
            relations: {
                idioma: true,
                genero: true,
                clasificacion: true,
                estado: true,
            },
        });
        if (!saved) throw new Error('404 Pelicula not found after create.');
        return this.toResponse(saved);
    }

    async getAllPeliculas(
        page = 1,
        quantity = 10,
    ): Promise<PeliculaResponse[]> {
        const skip = (page - 1) * quantity;
        const pelis = await this.peliculaRepo.find({
            relations: { idioma: true, genero: true, clasificacion: true, estado: true },
            where: { estado: { nombre: 'EN CARTELERA' } }, // filtro por estado
            order: { titulo: 'ASC' },
            skip,
            take: quantity,
        });
        return pelis.map((p) => this.toResponse(p));
    }
    async getPeliculaById(id: number): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                idioma: true,
                genero: true,
                clasificacion: true,
                estado: true,
            },
        });
        if (!p) throw new Error('404 Pelicula not found.');
        return this.toResponse(p);
    }

    async updatePelicula(
        id: number,
        datos: PeliculaInput,
    ): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({ where: { id } });
        if (!p) throw new Error('404 Pelicula not found.');

        const rels = await this.resolveRelationsByIds(datos);

        p.titulo = datos.titulo;
        p.sinopsis = datos.sinopsis;
        p.director = datos.director;
        p.duracion = datos.duracion;
        p.fechaEstreno = datos.fechaEstreno;
        p.idioma = rels.idioma;
        p.genero = rels.genero;
        p.clasificacion = rels.clasificacion;
        p.estado = rels.estado;
        p.urlImagen = datos.urlImagen;

        await this.peliculaRepo.save(p);

        const updated = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                idioma: true,
                genero: true,
                clasificacion: true,
                estado: true,
            },
        });
        if (!updated) throw new Error('404 Pelicula not found after update.');
        return this.toResponse(updated);
    }

    async partialUpdatePelicula(
        id: number,
        datos: Partial<PeliculaInput>,
    ): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                idioma: true,
                genero: true,
                clasificacion: true,
                estado: true,
            },
        });
        if (!p) throw new Error('404 Pelicula not found.');

        if (datos.titulo !== undefined) p.titulo = datos.titulo;
        if (datos.sinopsis !== undefined) p.sinopsis = datos.sinopsis;
        if (datos.director !== undefined) p.director = datos.director;
        if (datos.duracion !== undefined) p.duracion = datos.duracion;
        if (datos.fechaEstreno !== undefined)
            p.fechaEstreno = datos.fechaEstreno;

        if (datos.idioma !== undefined) {
            const idioma = await this.idiomaRepo.findOne({
                where: { nombre: datos.idioma },
            });
            if (!idioma) throw new Error('404 Idioma not found.');
            p.idioma = idioma;
        }
        if (datos.genero !== undefined) {
            const genero = await this.generoRepo.findOne({
                where: { nombre: datos.genero },
            });
            if (!genero) throw new Error('404 Genero not found.');
            p.genero = genero;
        }
        if (datos.clasificacion !== undefined) {
            const clas = await this.clasificacionRepo.findOne({
                where: { nombre: datos.clasificacion },
            });
            if (!clas) throw new Error('404 Clasificacion not found.');
            p.clasificacion = clas;
        }
        if (datos.estado !== undefined) {
            const est = await this.estadoRepo.findOne({
                where: { nombre: datos.estado },
            });
            if (!est) throw new Error('404 Estado not found.');
            p.estado = est;
        }

        await this.peliculaRepo.save(p);
        return this.toResponse(p);
    }

    async deletePeliculaById(id: number): Promise<{ message: string }> {
        const p = await this.peliculaRepo.findOne({ where: { id } });
        if (!p) throw new Error('404 Pelicula not found.');
        await this.peliculaRepo.remove(p);
        return { message: 'Deleted' };
    }

    async ponerEnCartelera(id: number): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                estado: true,
                idioma: true,
                genero: true,
                clasificacion: true,
            },
        });
        if (!p) throw new Error('404 Pelicula not found.');
        const estado = await this.estadoRepo.findOne({
            where: { nombre: 'En Cartelera' },
        });
        if (!estado) throw new Error('404 Estado "En Cartelera" not found.');
        p.estado = estado;
        await this.peliculaRepo.save(p);
        return this.toResponse(p);
    }

    async sacarDeCartelera(id: number): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                estado: true,
                idioma: true,
                genero: true,
                clasificacion: true,
            },
        });
        if (!p) throw new Error('404 Pelicula not found.');
        const estado = await this.estadoRepo.findOne({
            where: { nombre: 'Fuera de Cartelera' },
        });
        if (!estado)
            throw new Error('404 Estado "Fuera de Cartelera" not found.');
        p.estado = estado;
        await this.peliculaRepo.save(p);
        return this.toResponse(p);
    }

    async getPeliculaConEmpleado(idPelicula: number) {
        const pelicula = await this.peliculaRepo.findOne({
            where: { id: idPelicula },
        });

        if (!pelicula) throw new Error('Película no encontrada');

        const empleadoResponse = await axiosUsuariosClient.get(
            config.APIUsuariosUrls.getDatosEmpleadoById(pelicula.empleadoId),
        );

        return {
            ...pelicula,
            empleadoResponsable: empleadoResponse.data,
        };
    }
}
