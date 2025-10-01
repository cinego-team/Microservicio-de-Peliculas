import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';

@Entity('Idioma')
export class Idioma{
  @PrimaryGeneratedColumn()
  idIdioma: number;

  @Column()
  nombre: string;
  
  @OneToMany(() => Pelicula, (pelicula) => pelicula.idioma)
  peliculas: Pelicula[];

}