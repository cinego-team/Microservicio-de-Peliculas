import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('Clasificacion')
export class Clasificacion{
  @PrimaryGeneratedColumn()
  idClasificacion: number;

  @Column()
  nombre: string;
  @OneToMany(() => Pelicula, (pelicula) => pelicula.clasificacion)
  peliculas: Pelicula[];
}