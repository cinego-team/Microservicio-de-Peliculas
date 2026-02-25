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
    ParseIntPipe,
} from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoInput } from './estado.dto';

@Controller('estado-pelicula')
export class EstadoController {
    constructor(private readonly service: EstadoService) {}

    @Post('admin/new')
    new(@Body() dto: EstadoInput) {
        return this.service.newEstado(dto);
    }

    @Get('admin/all')
    getAll(@Query('page') page = '1', @Query('quantity') quantity = '10') {
        return this.service.getAllEstados(Number(page), Number(quantity));
    }

    @Get('admin/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getEstadoById(id);
    }

    @Put('admin/:id')
    updateFull(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: EstadoInput,
    ) {
        return this.service.updateEstado(id, dto);
    }

    @Delete('admin/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteEstadoById(id);
    }
}
