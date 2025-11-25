import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('genero')
export class Genero {
    @PrimaryGeneratedColumn({ name: 'id' })
    idGenero: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @OneToMany(() => Pelicula, (pelicula) => pelicula.genero)
    peliculas: Pelicula[];
}