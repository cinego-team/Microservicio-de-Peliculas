// DTO para crear o actualizar una película
export class PeliculaInput {
  idiomaId: number;        // FK a Idioma
  generoId: number;        // FK a Género
  clasificacionId: number; // FK a Clasificación
  estadoId: number;        // FK a Estado
  titulo: string;
  sinopsis: string;
  director: string;
  duracion: number;        // minutos
  fechaEstreno: string;    // formato ISO (YYYY-MM-DD)
}

// DTO para devolver la película con solo los nombres de las relaciones
export class PeliculaResponse {
  id: number;
  titulo: string;
  sinopsis: string;
  director: string;
  duracion: number;
  fechaEstreno: string;
  idioma: string;          
  genero: string;          
  clasificacion: string;   
  estado: string;          
}
