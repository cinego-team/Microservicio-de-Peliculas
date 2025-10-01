import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Estado } from '../entities/estado.entity';
import { EstadoInput, EstadoResponse } from './estado.dto';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado) private readonly estadoRepo: Repository<Estado>,
  ) {}

  /* Helpers */
  private toResponse(e: Estado): EstadoResponse {
    return {
      id: (e as any).idEstado, // PK real
      nombre: e.nombre,
    };
  }

  /* Create */
  async newEstado(datos: EstadoInput): Promise<EstadoResponse> {
    const estado = this.estadoRepo.create({ nombre: datos.nombre });
    await this.estadoRepo.save(estado);
    return this.toResponse(estado);
  }

  /* Read */
  async getAllEstados(page = 1, quantity = 10): Promise<EstadoResponse[]> {
    const skip = (page - 1) * quantity;
    const list = await this.estadoRepo.find({
      order: { nombre: 'ASC' },
      skip,
      take: quantity,
    });
    return list.map((e) => this.toResponse(e));
  }

  async getEstadoById(id: number): Promise<EstadoResponse> {
    const estado = await this.estadoRepo.findOne({ where: { idEstado: id } });
    if (!estado) throw new Error('404 Estado not found.');
    return this.toResponse(estado);
  }

  /* Update (full) */
  async updateEstado(id: number, datos: EstadoInput): Promise<EstadoResponse> {
    const estado = await this.estadoRepo.findOne({ where: { idEstado: id } });
    if (!estado) throw new Error('404 Estado not found.');
    estado.nombre = datos.nombre;
    await this.estadoRepo.save(estado);
    return this.toResponse(estado);
  }

  /* Partial update */
  async partialUpdateEstado(
    id: number,
    datos: Partial<EstadoInput>,
  ): Promise<EstadoResponse> {
    const estado = await this.estadoRepo.findOne({ where: { idEstado: id } });
    if (!estado) throw new Error('404 Estado not found.');
    if (datos.nombre !== undefined) estado.nombre = datos.nombre;
    await this.estadoRepo.save(estado);
    return this.toResponse(estado);
  }

  /* Delete */
  async deleteEstadoById(id: number): Promise<{ message: string }> {
    const estado = await this.estadoRepo.findOne({ where: { idEstado: id } });
    if (!estado) throw new Error('404 Estado not found.');
    await this.estadoRepo.remove(estado);
    return { message: 'Deleted' };
  }
}

