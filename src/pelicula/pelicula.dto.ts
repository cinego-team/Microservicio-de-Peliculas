// DTO para crear o actualizar una película
export class PeliculaInput {
    idioma: string;
    genero: string;
    clasificacion: string;
    estado: string;
    titulo: string;
    sinopsis: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    urlImagen: string;
}

// DTO para devolver la película con solo los nombres de las relaciones
export class PeliculaResponse {
    id: number;
    titulo: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    sinopsis: string;
    url: string;
    empleadoResponsable: number;
    idioma: string;
    genero: string;
    clasificacion: string;
    estado: string;
}
