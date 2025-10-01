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

@Entity('pelicula') // usa el nombre de tabla que tengas
export class Pelicula {
  @PrimaryGeneratedColumn()
  id: number; // <-- nombre estándar, evita problemas en services

  @Column()
  titulo: string;

  @Column({ nullable: true })
  director: string;

  @Column()
  duracion: number; // minutos

  @Column({ type: 'date', nullable: true })
  fechaEstreno: Date | null;

  @Column({ type: 'text', nullable: true })
  sinopsis: string;

  // Relaciones (FK en Pelicula) => ManyToOne
  @ManyToOne(() => Idioma, (idioma) => idioma.peliculas, { nullable: false })
  @JoinColumn({ name: 'idioma_id' })
  idioma: Idioma;


  @ManyToOne(() => Genero, { nullable: false, eager: false })
  @JoinColumn({ name: 'genero_id' })
  genero: Genero;

  @ManyToOne(() => Clasificacion, { nullable: false, eager: false })
  @JoinColumn({ name: 'clasificacion_id' })
  clasificacion: Clasificacion;

  @ManyToOne(() => Estado, { nullable: false, eager: false })
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  // Si querés conservar métodos de dominio, mejor trabajar asignando el Estado
  ponerEnCartelera(estado: Estado) {
    this.estado = estado; // el service se encarga de traer el Estado "En Cartelera"
  }

  sacarDeCartelera(estado: Estado) {
    this.estado = estado; // idem "Fuera de Cartelera"
  }
}

