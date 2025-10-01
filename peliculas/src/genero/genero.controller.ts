import {
  Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe,
} from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroInput } from './genero.dto';

@Controller('generos')
export class GeneroController {
  constructor(private readonly service: GeneroService) {}

  @Post('new')
  new(@Body() dto: GeneroInput) {
    return this.service.newGenero(dto);
  }

  @Get()
  getAll(@Query('page') page = '1', @Query('quantity') quantity = '10') {
    return this.service.getAllGeneros(Number(page), Number(quantity));
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getGeneroById(id);
  }

  @Put(':id')
  updateFull(@Param('id', ParseIntPipe) id: number, @Body() dto: GeneroInput) {
    return this.service.updateGenero(id, dto);
  }

  @Patch(':id')
  updatePartial(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<GeneroInput>) {
    return this.service.partialUpdateGenero(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteGeneroById(id);
  }
}
