import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Pelicula } from './pelicula.entity';

@Entity('clasificacion')
export class Clasificacion {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @OneToMany(() => Pelicula, (pelicula) => pelicula.clasificacion)
    peliculas: Pelicula[];
}
