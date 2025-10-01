import { Test, TestingModule } from '@nestjs/testing';
import { PeliculaService } from './pelicula.service';

describe('PeliculaService', () => {
  let service: PeliculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeliculaService],
    }).compile();

    service = module.get<PeliculaService>(PeliculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
