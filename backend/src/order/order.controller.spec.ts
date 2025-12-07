import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MakeOrderDTO } from './dto/order.dto';

jest.mock('@faker-js/faker', () => ({
  faker: {
    string: { uuid: () => 'test-uuid' },
  },
}));

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  let mockData: MakeOrderDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        makeOrder: jest.fn(),
      })
      .compile();

    mockData = {
      phone: '+70000000000',
      email: 'mock@mock.ru',
      tickets: [],
    };

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('.createOrder() должен вызвать метод .makeOrder сервиса', () => {
    orderController.create(mockData);
    expect(orderService.makeOrder).toHaveBeenCalled();
  });
});
