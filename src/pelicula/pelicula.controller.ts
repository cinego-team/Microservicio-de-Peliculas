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
    Headers,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { PeliculaService } from './pelicula.service';
import { PeliculaInput, PeliculaInputAdmin } from './pelicula.dto';

@Controller('pelicula')
export class PeliculaController {
    constructor(private readonly service: PeliculaService) { }
    //  ADMIN

    @Get('admin/all')
    getAllAdmin(
        @Headers('authorization') token: string,
        @Query('page') page: number,
        @Query('quantity') quantity: number
    ) {
        return this.service.getPeliculasCompleto(token, page, quantity);
    }

    @Get('admin/selec')
    getAdmin() {
        return this.service.getPeliculasParaSelec();
    }

    @Get('admin/:id')
    getByIdAdmin(@Param('id', ParseIntPipe) id: number) {
        return this.service.getPeliculaByIdForAdmin(id);
    }

    @Post('admin/new')
    newPelAdmin(@Body() dto: PeliculaInputAdmin) {
        return this.service.createPeliculaAdmin(dto);
    }

    @Put('admin/:id')
    updateFullAdmin(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: PeliculaInputAdmin,
    ) {
        return this.service.updatePeliculaAdmin(id, dto);
    }

    @Delete('admin/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.deletePeliculaById(id);
    }

    // ===== GENERALES =====

    @Get()
    getAll() {
        return this.service.getAllPeliculas();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getPeliculaById(id);
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
