import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('clasificacion')
export class Clasificacion {
    @PrimaryGeneratedColumn({ name: 'id' })
    idClasificacion: number;

    @Column()
    nombre: string;

    @OneToMany(() => Pelicula, (pelicula) => pelicula.clasificacion)
    peliculas: Pelicula[];
}