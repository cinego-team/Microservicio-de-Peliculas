import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Idioma } from '../entities/idioma.entity';
import { IdiomaInput, IdiomaResponse } from './idioma.dto';

@Injectable()
export class IdiomaService {
  constructor(
    @InjectRepository(Idioma) private readonly idiomaRepo: Repository<Idioma>,
  ) {}

  /* --------- Helpers --------- */
  private toResponse(i: Idioma): IdiomaResponse {
    return {
      id: i.idIdioma,      // PK real
      nombre: i.nombre,
    };
  }

  /* --------- Create --------- */
  async newIdioma(datos: IdiomaInput): Promise<IdiomaResponse> {
    const idioma = this.idiomaRepo.create({ nombre: datos.nombre });
    await this.idiomaRepo.save(idioma);
    return this.toResponse(idioma);
  }

  /* --------- Read (list + by id) --------- */
  async getAllIdiomas(page = 1, quantity = 10): Promise<IdiomaResponse[]> {
    const skip = (page - 1) * quantity;
    const list = await this.idiomaRepo.find({
      order: { nombre: 'ASC' },
      skip,
      take: quantity,
    });
    return list.map((i) => this.toResponse(i));
  }

  async getIdiomaById(id: number): Promise<IdiomaResponse> {
    const idioma = await this.idiomaRepo.findOne({ where: { idIdioma: id } });
    if (!idioma) throw new Error('404 Idioma not found.');
    return this.toResponse(idioma);
  }

  /* --------- Update (full) --------- */
  async updateIdioma(id: number, datos: IdiomaInput): Promise<IdiomaResponse> {
    const idioma = await this.idiomaRepo.findOne({ where: { idIdioma: id } });
    if (!idioma) throw new Error('404 Idioma not found.');
    idioma.nombre = datos.nombre;
    await this.idiomaRepo.save(idioma);
    return this.toResponse(idioma);
  }

  /* --------- Partial update --------- */
  async partialUpdateIdioma(
    id: number,
    datos: Partial<IdiomaInput>,
  ): Promise<IdiomaResponse> {
    const idioma = await this.idiomaRepo.findOne({ where: { idIdioma: id } });
    if (!idioma) throw new Error('404 Idioma not found.');

    if (datos.nombre !== undefined) idioma.nombre = datos.nombre;

    await this.idiomaRepo.save(idioma);
    return this.toResponse(idioma);
  }

  /* --------- Delete --------- */
  async deleteIdiomaById(id: number): Promise<{ message: string }> {
    const idioma = await this.idiomaRepo.findOne({ where: { idIdioma: id } });
    if (!idioma) throw new Error('404 Idioma not found.');
    await this.idiomaRepo.remove(idioma);
    return { message: 'Deleted' };
  }
}
