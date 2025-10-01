import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('Genero')
export class Genero{
  @PrimaryGeneratedColumn()
  idGenero: number;

  @Column()
  nombre: string;
  
  @OneToMany(() => Pelicula, (pelicula) => pelicula.genero)
  peliculas: Pelicula[];
}