import { IsString, IsNotEmpty } from 'class-validator';

export class ClasificacionInput {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

export class ClasificacionResponse {
    id: number;
    nombre: string;
}
