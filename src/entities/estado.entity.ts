import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('estado_pelicula')
export class Estado {
    @PrimaryGeneratedColumn({ name: 'id' })
    idEstado: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @OneToMany(() => Pelicula, (pelicula) => pelicula.estado)
    peliculas: Pelicula[];
}