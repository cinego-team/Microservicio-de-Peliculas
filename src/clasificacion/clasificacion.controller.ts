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
import { ClasificacionService } from './clasificacion.service';
import { ClasificacionInput } from './clasificacion.dto';

@Controller('clasificacion')
export class ClasificacionController {
    constructor(private readonly service: ClasificacionService) {}

    @Post('admin/new')
    new(@Body() dto: ClasificacionInput) {
        console.log('📦 BODY RECIBIDO:', dto);
        return this.service.newClasificacion(dto);
    }

    @Get('admin/all')
    getAll(@Query('page') page = '1', @Query('quantity') quantity = '10') {
        return this.service.getAllClasificaciones(
            Number(page),
            Number(quantity),
        );
    }

    @Get('admin/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getClasificacionById(id);
    }

    @Put('admin/:id')
    updateFull(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ClasificacionInput,
    ) {
        return this.service.updateClasificacion(id, dto);
    }

    @Patch(':id')
    updatePartial(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<ClasificacionInput>,
    ) {
        return this.service.partialUpdateClasificacion(id, dto);
    }

    @Delete('admin/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteClasificacionById(id);
    }
}
