import {
  Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe,
} from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoInput } from './estado.dto';

@Controller('estados')
export class EstadoController {
  constructor(private readonly service: EstadoService) {}

  @Post('new')
  new(@Body() dto: EstadoInput) {
    return this.service.newEstado(dto);
  }

  @Get()
  getAll(@Query('page') page = '1', @Query('quantity') quantity = '10') {
    return this.service.getAllEstados(Number(page), Number(quantity));
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getEstadoById(id);
  }

  @Put(':id')
  updateFull(@Param('id', ParseIntPipe) id: number, @Body() dto: EstadoInput) {
    return this.service.updateEstado(id, dto);
  }

  @Patch(':id')
  updatePartial(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<EstadoInput>) {
    return this.service.partialUpdateEstado(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteEstadoById(id);
  }
}
