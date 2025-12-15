import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { PeliculaService } from './pelicula.service';
import { PeliculaInput, PeliculaInputAdmin } from './pelicula.dto';

@Controller('pelicula')
export class PeliculaController {
    constructor(private readonly service: PeliculaService) {}

    @Post('new')
    new(@Body() dto: PeliculaInput) {
        return this.service.newPelicula(dto);
    }

    @Get()
    getAll() {
        return this.service.getAllPeliculas();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getPeliculaById(id);
    }

    @Put(':id')
    updateFull(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: PeliculaInput,
    ) {
        return this.service.updatePelicula(id, dto);
    }

    @Delete(':id/admin')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.deletePeliculaById(id);
    }

    @Patch(':id/poner-en-cartelera')
    poner(@Param('id', ParseIntPipe) id: number) {
        return this.service.ponerEnCartelera(id);
    }

    @Patch(':id/sacar-de-cartelera')
    sacar(@Param('id', ParseIntPipe) id: number) {
        return this.service.sacarDeCartelera(id);
    }
    //metodos para empleado
    @Get(':id/admin')
    getByIdAdmin(@Param('id', ParseIntPipe) id: number) {
        return this.service.getPeliculaByIdForAdmin(id);
    }
    @Get('admin/selec')
    getAdmin() {
        return this.service.getPeliculasParaSelec();
    }
    @Get('admin/all')
    getAllAdmin() {
        return this.service.getPeliculasCompleto();
    }
    @Post('new/admin')
    newPelAdmin(@Body() dto: PeliculaInputAdmin) {
        return this.service.createPeliculaAdmin(dto);
    }
    @Put(':id/admin')
    updateFullAdmin(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: PeliculaInputAdmin,
    ) {
        return this.service.updatePeliculaAdmin(id, dto);
    }
}
