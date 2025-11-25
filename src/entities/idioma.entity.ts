import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';

@Entity('idioma')
export class Idioma {
    @PrimaryGeneratedColumn({ name: 'id' })
    idIdioma: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @OneToMany(() => Pelicula, (pelicula) => pelicula.idioma)
    peliculas: Pelicula[];

}