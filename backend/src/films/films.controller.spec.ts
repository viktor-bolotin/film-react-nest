import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmController: FilmsController;
  let filmService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findSessions: jest.fn(),
      })
      .compile();

    filmController = module.get<FilmsController>(FilmsController);
    filmService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmController).toBeDefined();
  });

  it('.findAll() должен вызвать метод .findAll() сервиса', () => {
    filmController.getAllFilms();
    expect(filmService.findAll).toHaveBeenCalled();
  });

  it('.getSchedule() должен вызвать метод .findSessions() сервиса', () => {
    filmController.getSchedule('1');
    expect(filmService.findSessions).toHaveBeenCalled();
  });
});
