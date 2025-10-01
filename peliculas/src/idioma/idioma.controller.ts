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
import { IdiomaService } from './idioma.service';
import { IdiomaInput } from './idioma.dto';

@Controller('idiomas')
export class IdiomaController {
  constructor(private readonly service: IdiomaService) {}

  @Post('new')
  new(@Body() dto: IdiomaInput) {
    return this.service.newIdioma(dto);
  }

  @Get()
  getAll(
    @Query('page') page = '1',
    @Query('quantity') quantity = '10',
  ) {
    return this.service.getAllIdiomas(Number(page), Number(quantity));
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getIdiomaById(id);
  }

  @Put(':id')
  updateFull(@Param('id', ParseIntPipe) id: number, @Body() dto: IdiomaInput) {
    return this.service.updateIdioma(id, dto);
  }

  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<IdiomaInput>,
  ) {
    return this.service.partialUpdateIdioma(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteIdiomaById(id);
  }
}
