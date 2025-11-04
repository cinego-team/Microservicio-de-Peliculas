// DTO para crear o actualizar una película
export class PeliculaInput {
    idiomaId: number;
    generoId: number;
    clasificacionId: number;
    estadoId: number;
    titulo: string;
    sinopsis: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
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
