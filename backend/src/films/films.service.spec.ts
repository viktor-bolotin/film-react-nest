import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    class FilmsRepositoryMock {}
    class ScheduleRepositoryMock {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: 'FilmsRepository', useClass: FilmsRepositoryMock },
        { provide: 'SchedulesRepository', useClass: ScheduleRepositoryMock },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
