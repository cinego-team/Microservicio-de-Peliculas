import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Estado } from './estado.entity';
import { Idioma } from './idioma.entity';
import { Clasificacion } from './clasificacion.entity';
import { Genero } from './genero.entity';

@Entity('pelicula')
export class Pelicula {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    titulo: string;

    @Column({ type: 'varchar', length: 100 })
    director: string;

    @Column()
    duracion: number; // minutos

    @Column({ nullable: true, name: 'fecha_estreno', length: 10 })
    fechaEstreno?: string;

    @Column({ type: 'text', nullable: true })
    sinopsis: string;

    @Column({ type: 'text', nullable: true })
    urlImagen: string;

    @Column({ name: 'empleado_responsable' })
    empleadoId: number;

    // Relaciones (FK en Pelicula) => ManyToOne
    @ManyToOne(() => Idioma, (idioma) => idioma.peliculas, { nullable: false })
    @JoinColumn({ name: 'idioma' })
    idioma: Idioma;

    @ManyToOne(() => Genero, { nullable: false, eager: false })
    @JoinColumn({ name: 'genero' })
    genero: Genero;

    @ManyToOne(() => Clasificacion, { nullable: false, eager: false })
    @JoinColumn({ name: 'clasificacion' })
    clasificacion: Clasificacion;

    @ManyToOne(() => Estado, { nullable: false, eager: false })
    @JoinColumn({ name: 'estado' })
    estado: Estado;

    ponerEnCartelera(estado: Estado) {
        this.estado = estado; // el service se encarga de traer el Estado "En Cartelera"
    }

    sacarDeCartelera(estado: Estado) {
        this.estado = estado; // idem "Fuera de Cartelera"
    }
}
