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

    @Column()
    titulo: string;

    @Column({ nullable: true })
    director: string;

    @Column()
    duracion: number; // minutos

    @Column({ nullable: true })
    fechaEstreno?: string;

    @Column({ type: 'text', nullable: true })
    sinopsis?: string;

<<<<<<< HEAD
  @Column({ type: 'text', nullable: true })
  url: string;
  
  @Column()
  empleadoId: number;
  
  // Relaciones (FK en Pelicula) => ManyToOne
  @ManyToOne(() => Idioma, (idioma) => idioma.peliculas, { nullable: false })
  @JoinColumn({ name: 'idioma_id' })
  idioma: Idioma;
=======
    @Column({ type: 'text', nullable: true })
    urlImagen?: string;

    // Relaciones (FK en Pelicula) => ManyToOne
    @ManyToOne(() => Idioma, (idioma) => idioma.peliculas, { nullable: false })
    @JoinColumn({ name: 'idioma_id' })
    idioma: Idioma;
>>>>>>> e1c38d2911f19e25e8671931cb08f1dfcc8c2d33

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

