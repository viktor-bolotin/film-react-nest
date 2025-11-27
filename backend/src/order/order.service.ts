import { HttpException, Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/repository';
import { MakeOrderDTO, ticketsData } from './dto/order.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async makeOrder(orderData: MakeOrderDTO): Promise<any> {
    const ticketsData: ticketsData[] = orderData.tickets;

    for (const ticket of ticketsData) {
      const check = await this.filmsRepository.checkFreePlace({
        filmId: ticket.film,
        sessionId: ticket.session,
        place: `${ticket.row}:${ticket.seat}`,
      });

      if (!check) {
        return { message: `Место ${ticket.row}:${ticket.seat} уже занято` };
      }
    }

    const bookingData = [];

    for (const order of ticketsData) {
      const booking = await this.filmsRepository.bookingPlaces({
        filmId: order.film,
        sessionId: order.session,
        place: `${order.row}:${order.seat}`,
      });

      if (booking) {
        const id = faker.string.uuid();
        const data = { ...order, id };
        bookingData.push(data);
      }

      if (!booking) {
        return new HttpException({ error: 'Не удалось оформить заказ' }, 409);
      }
    }

    return {
      total: bookingData.length,
      items: bookingData,
    };
  }
}
