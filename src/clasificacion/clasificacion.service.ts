import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Clasificacion } from '../entities/clasificacion.entity';
import { ClasificacionInput, ClasificacionResponse } from './clasificacion.dto';

@Injectable()
export class ClasificacionService {
    constructor(
        @InjectRepository(Clasificacion)
        private readonly clasificacionRepo: Repository<Clasificacion>,
    ) {}

    /* Helpers */
    private toResponse(c: Clasificacion): ClasificacionResponse {
        return {
            id: (c as any).idClasificacion, // PK real
            nombre: c.nombre,
        };
    }

    /* Create */
    async newClasificacion(
        datos: ClasificacionInput,
    ): Promise<ClasificacionResponse> {
        const clasificacion = this.clasificacionRepo.create({
            nombre: datos.nombre,
        });
        await this.clasificacionRepo.save(clasificacion);
        return this.toResponse(clasificacion);
    }

    /* Read */
    async getAllClasificaciones(
        page = 1,
        quantity = 10,
    ): Promise<ClasificacionResponse[]> {
        const skip = (page - 1) * quantity;
        const list = await this.clasificacionRepo.find({
            order: { nombre: 'ASC' },
            skip,
            take: quantity,
        });
        return list.map((c) => this.toResponse(c));
    }

    async getClasificacionById(id: number): Promise<ClasificacionResponse> {
        const clas = await this.clasificacionRepo.findOne({
            where: { id: id },
        });
        if (!clas) throw new Error('404 Clasificacion not found.');
        return this.toResponse(clas);
    }

    /* Update (full) */
    async updateClasificacion(
        id: number,
        datos: ClasificacionInput,
    ): Promise<ClasificacionResponse> {
        const clas = await this.clasificacionRepo.findOne({
            where: { id: id },
        });
        if (!clas) throw new Error('404 Clasificacion not found.');
        clas.nombre = datos.nombre;
        await this.clasificacionRepo.save(clas);
        return this.toResponse(clas);
    }

    /* Partial update */
    async partialUpdateClasificacion(
        id: number,
        datos: Partial<ClasificacionInput>,
    ): Promise<ClasificacionResponse> {
        const clas = await this.clasificacionRepo.findOne({
            where: { id: id },
        });
        if (!clas) throw new Error('404 Clasificacion not found.');
        if (datos.nombre !== undefined) clas.nombre = datos.nombre;
        await this.clasificacionRepo.save(clas);
        return this.toResponse(clas);
    }

    /* Delete */
    async deleteClasificacionById(id: number): Promise<{ message: string }> {
        const clas = await this.clasificacionRepo.findOne({
            where: { id },
        });

        if (!clas) {
            throw new Error('404 Clasificacion not found.');
        }

        await this.clasificacionRepo.remove(clas);
        return { message: 'Deleted' };
    }
}
