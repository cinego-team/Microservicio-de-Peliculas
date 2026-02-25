import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Estado } from './estado.entity';
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

    @Column({ type: 'text', nullable: true, name: 'url_imagen' })
    urlImagen: string;

    @Column({ name: 'empleado_responsable' })
    empleadoId: number;

    @ManyToOne(() => Genero, { nullable: false, eager: false })
    @JoinColumn({ name: 'genero_id' })
    genero: Genero;

    @ManyToOne(() => Clasificacion, { nullable: false, eager: false })
    @JoinColumn({ name: 'clasificacion_id' })
    clasificacion: Clasificacion;

    @ManyToOne(() => Estado, { nullable: false, eager: false })
    @JoinColumn({ name: 'estado_id' })
    estado: Estado;

    ponerEnCartelera(estado: Estado) {
        this.estado = estado; // el service se encarga de traer el Estado "En Cartelera"
    }

    sacarDeCartelera(estado: Estado) {
        this.estado = estado; // idem "Fuera de Cartelera"
    }
}
