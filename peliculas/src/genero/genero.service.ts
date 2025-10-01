import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genero } from '../entities/genero.entity';
import { GeneroInput, GeneroResponse } from './genero.dto';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero) private readonly generoRepo: Repository<Genero>,
  ) {}

  /* Helpers */
  private toResponse(g: Genero): GeneroResponse {
    return {
      id: (g as any).idGenero, // PK real
      nombre: g.nombre,
    };
  }

  /* Create */
  async newGenero(datos: GeneroInput): Promise<GeneroResponse> {
    const genero = this.generoRepo.create({ nombre: datos.nombre });
    await this.generoRepo.save(genero);
    return this.toResponse(genero);
  }

  /* Read */
  async getAllGeneros(page = 1, quantity = 10): Promise<GeneroResponse[]> {
    const skip = (page - 1) * quantity;
    const list = await this.generoRepo.find({
      order: { nombre: 'ASC' },
      skip,
      take: quantity,
    });
    return list.map((g) => this.toResponse(g));
  }

  async getGeneroById(id: number): Promise<GeneroResponse> {
    const genero = await this.generoRepo.findOne({ where: { idGenero: id } });
    if (!genero) throw new Error('404 Genero not found.');
    return this.toResponse(genero);
  }

  /* Update (full) */
  async updateGenero(id: number, datos: GeneroInput): Promise<GeneroResponse> {
    const genero = await this.generoRepo.findOne({ where: { idGenero: id } });
    if (!genero) throw new Error('404 Genero not found.');
    genero.nombre = datos.nombre;
    await this.generoRepo.save(genero);
    return this.toResponse(genero);
  }

  /* Partial update */
  async partialUpdateGenero(
    id: number,
    datos: Partial<GeneroInput>,
  ): Promise<GeneroResponse> {
    const genero = await this.generoRepo.findOne({ where: { idGenero: id } });
    if (!genero) throw new Error('404 Genero not found.');
    if (datos.nombre !== undefined) genero.nombre = datos.nombre;
    await this.generoRepo.save(genero);
    return this.toResponse(genero);
  }

  /* Delete */
  async deleteGeneroById(id: number): Promise<{ message: string }> {
    const genero = await this.generoRepo.findOne({ where: { idGenero: id } });
    if (!genero) throw new Error('404 Genero not found.');
    await this.generoRepo.remove(genero);
    return { message: 'Deleted' };
  }
}
