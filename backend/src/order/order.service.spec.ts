import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

jest.mock('@faker-js/faker', () => ({
  faker: {
    string: { uuid: () => 'test-uuid' },
  },
}));

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    class ScheduleRepositoryMock {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: 'SchedulesRepository', useClass: ScheduleRepositoryMock },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
