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
import { GeneroService } from './genero.service';
import { GeneroInput } from './genero.dto';

@Controller('genero')
export class GeneroController {
    constructor(private readonly service: GeneroService) {}

    @Post('admin/new')
    new(@Body() dto: GeneroInput) {
        return this.service.newGenero(dto);
    }

    @Get('admin/all')
    getAll(@Query('page') page = '1', @Query('quantity') quantity = '10') {
        return this.service.getAllGeneros(Number(page), Number(quantity));
    }

    @Get('admin/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getGeneroById(id);
    }

    @Put('admin/:id')
    updateFull(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: GeneroInput,
    ) {
        return this.service.updateGenero(id, dto);
    }

    @Delete('admin/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteGeneroById(id);
    }
}
