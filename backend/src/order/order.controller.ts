import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { MakeOrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderData: MakeOrderDTO) {
    return this.orderService.makeOrder(orderData);
  }
}
