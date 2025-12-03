import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { PeliculaService } from './pelicula.service';
import { PeliculaInput } from './pelicula.dto';

@Controller('pelicula')
export class PeliculaController {
    constructor(private readonly service: PeliculaService) { }

    @Post('new')
    new(@Body() dto: PeliculaInput) {
        return this.service.newPelicula(dto);
    }

    @Get()
    getAll(
        @Query('page') page = '1',
        @Query('quantity') quantity = '10',
    ) {
        return this.service.getAllPeliculas(Number(page), Number(quantity));
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


    @Delete(':id')
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
}

