import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('Estado')
export class Estado{
  @PrimaryGeneratedColumn()
  idEstado: number;

  @Column()
  nombre: string;

  
  @OneToMany(() => Pelicula, (pelicula) => pelicula.estado)
  peliculas: Pelicula[];
}