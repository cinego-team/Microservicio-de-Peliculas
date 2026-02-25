import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from '../entities/pelicula.entity';
import { Genero } from '../entities/genero.entity';
import { Clasificacion } from '../entities/clasificacion.entity';
import { Estado } from '../entities/estado.entity';
import { axiosAPIUsuario } from '../../axios_service/axios.client';
import { config } from '../../axios_service/env';
import {
    PeliculaInput,
    PeliculaResponse,
    EmpleadoDto,
    PeliculaInputAdmin,
    UpdatePeliculaAdminDto,
} from './pelicula.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class PeliculaService {
    constructor(
        @InjectRepository(Pelicula) private peliculaRepo: Repository<Pelicula>,
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
            urlImagen: p.urlImagen ?? '',
            empleadoResponsable: p.empleadoId,
            genero: p.genero?.nombre ?? '',
            clasificacion: p.clasificacion?.nombre ?? '',
            estado: p.estado?.nombre ?? '',
        };
    }

    private async resolveRelationsByIds(dto: PeliculaInput) {
        const [genero, clasificacion, estado] = await Promise.all([
            this.generoRepo.findOne({ where: { nombre: dto.genero } }),
            this.clasificacionRepo.findOne({
                where: { nombre: dto.clasificacion },
            }),
            this.estadoRepo.findOne({ where: { nombre: dto.estado } }),
        ]);

        if (!genero) throw new Error('404 Genero not found.');
        if (!clasificacion) throw new Error('404 Clasificacion not found.');
        if (!estado) throw new Error('404 Estado not found.');

        return { genero, clasificacion, estado };
    }
    //metodos para el frontend de cliente
    async getAllPeliculas(): Promise<PeliculaResponse[]> {
        const pelis = await this.peliculaRepo.find({
            relations: {
                genero: true,
                clasificacion: true,
                estado: true,
            },
            where: { estado: { nombre: 'EN CARTELERA' } }, // filtro por estado
            order: { titulo: 'ASC' },
        });
        return pelis.map((p) => this.toResponse(p));
    }
    async getPeliculaById(id: number): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                genero: true,
                clasificacion: true,
                estado: true,
            },
        });
        if (!p) throw new Error('404 Pelicula not found.');
        return this.toResponse(p);
    }

    async ponerEnCartelera(id: number): Promise<PeliculaResponse> {
        const p = await this.peliculaRepo.findOne({
            where: { id },
            relations: {
                estado: true,
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

        const empleadoResponse = await axiosAPIUsuario.get(
            config.APIUsuariosUrls.getDatosEmpleadoById(pelicula.empleadoId),
        );

        return {
            ...pelicula,
            empleadoResponsable: empleadoResponse.data,
        };
    }

    //metodos para el frontend de empleado
    async getPeliculaByIdForAdmin(id: number) {
        const pelicula = await this.peliculaRepo.findOne({
            where: { id },
            relations: ['genero', 'clasificacion', 'estado'],
        });

        if (!pelicula) {
            throw new NotFoundException(`No existe la película con ID ${id}`);
        }
        return {
            id: pelicula.id,
            titulo: pelicula.titulo,
            sinopsis: pelicula.sinopsis,
            director: pelicula.director,
            duracion: pelicula.duracion,
            fechaEstreno: pelicula.fechaEstreno,
            urlImagen: pelicula.urlImagen,

            genero: {
                id: pelicula.genero.idGenero,
                nombre: pelicula.genero.nombre,
            },
            clasificacion: {
                id: pelicula.clasificacion.id,
                nombre: pelicula.clasificacion.nombre,
            },
            estadoPelicula: {
                id: pelicula.estado.idEstado,
                nombre: pelicula.estado.nombre,
            },
        };
    }
    async getPeliculasParaSelec(): Promise<{ id: number; titulo: string }[]> {
        const peliculas = await this.peliculaRepo.find({
            select: ['id', 'titulo'],
        });
        return peliculas.map((p) => ({
            id: p.id,
            titulo: p.titulo,
        }));
    }
    async getPeliculasCompleto(token: string, page, quantity): Promise<
        Array<{
            id: number;
            titulo: string;
            sinopsis: string;
            director: string;
            duracion: number;
            fechaEstreno: string | undefined;
            urlImagen: string;
            genero: { id: number; nombre: string };
            clasificacion: { id: number; nombre: string };
            estado: { id: number; nombre: string };
            empleado: {
                id: number;
                legajo: number;
                nombre: string;
                apellido: string;
            } | null;
        }>
    > {
        const skip = (page - 1) * quantity;
        const peliculas = await this.peliculaRepo.find({
            relations: ['genero', 'clasificacion', 'estado'],
            order: { titulo: 'ASC' },
            skip,
            take: quantity,
        });

        const respuesta = await Promise.all(
            peliculas.map(async (p) => {
                let empleado: EmpleadoDto | null = null;

                try {
                    const resp = await axiosAPIUsuario.get<EmpleadoDto>(
                        config.APIUsuariosUrls.getDatosEmpleadoById(
                            p.empleadoId,
                        ),
                        { headers: { Authorization: token } }, // <-- AGREGAR ESTO
                    );
                    empleado = resp.data;
                } catch {
                    empleado = null;
                }

                return {
                    id: p.id,
                    titulo: p.titulo,
                    sinopsis: p.sinopsis,
                    director: p.director,
                    duracion: p.duracion,
                    fechaEstreno: p.fechaEstreno,
                    urlImagen: p.urlImagen,

                    genero: {
                        id: p.genero.idGenero,
                        nombre: p.genero.nombre,
                    },

                    clasificacion: {
                        id: p.clasificacion.id,
                        nombre: p.clasificacion.nombre,
                    },

                    estado: {
                        id: p.estado.idEstado,
                        nombre: p.estado.nombre,
                    },

                    empleado: empleado
                        ? {
                            id: empleado.id,
                            legajo: empleado.legajo,
                            nombre: empleado.nombre,
                            apellido: empleado.apellido,
                        }
                        : null,
                };
            }),
        );

        return respuesta;
    }
    async createPeliculaAdmin(dto: PeliculaInputAdmin): Promise<void> {
        const genero = await this.generoRepo.findOne({
            where: { idGenero: dto.genero.id },
        });
        const clasificacion = await this.clasificacionRepo.findOne({
            where: { id: dto.clasificacion.id },
        });
        const estado = await this.estadoRepo.findOne({
            where: { idEstado: dto.estado.id },
        });

        if (!genero || !clasificacion || !estado) {
            throw new BadRequestException(
                'Género, clasificación o estado inválido.',
            );
        }
        const pelicula = this.peliculaRepo.create({
            titulo: dto.titulo,
            sinopsis: dto.sinopsis,
            director: dto.director,
            duracion: dto.duracion,
            fechaEstreno: dto.fechaEstreno,
            urlImagen: dto.urlImagen,
            genero,
            clasificacion,
            estado,
            empleadoId: dto.empleado.id,
        });
        await this.peliculaRepo.save(pelicula);
    }
    async updatePeliculaAdmin(
        id: number,
        dto: UpdatePeliculaAdminDto,
    ): Promise<Pelicula> {
        const pelicula = await this.peliculaRepo.findOne({
            where: { id },
            relations: ['genero', 'clasificacion', 'estado'],
        });

        if (!pelicula) {
            throw new NotFoundException('Película no encontrada');
        }

        const genero = await this.generoRepo.findOne({
            where: { idGenero: dto.genero.id },
        });
        const clasificacion = await this.clasificacionRepo.findOne({
            where: { id: dto.clasificacion.id },
        });
        const estado = await this.estadoRepo.findOne({
            where: { idEstado: dto.estado.id },
        });

        if (!genero || !clasificacion || !estado) {
            throw new BadRequestException('Relaciones inválidas');
        }

        pelicula.titulo = dto.titulo;
        pelicula.sinopsis = dto.sinopsis;
        pelicula.director = dto.director;
        pelicula.duracion = dto.duracion;
        pelicula.fechaEstreno = dto.fechaEstreno;
        pelicula.urlImagen = dto.urlImagen;

        pelicula.genero = genero;
        pelicula.clasificacion = clasificacion;
        pelicula.estado = estado;

        pelicula.empleadoId = dto.empleado.id;

        return await this.peliculaRepo.save(pelicula);
    }
    async deletePeliculaById(id: number): Promise<{ message: string }> {
        const p = await this.peliculaRepo.findOne({ where: { id } });
        if (!p) throw new Error('404 Pelicula not found.');
        await this.peliculaRepo.remove(p);
        return { message: 'Deleted' };
    }
}
