import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/order/schedule.entity';
import { MakeOrderDTO, MakeOrderRes, ticketsData } from './dto/order.dto';
import { Equal, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async makeOrder(orderData: MakeOrderDTO): Promise<MakeOrderRes> {
    const ticketsData: ticketsData[] = orderData.tickets;

    for (const ticket of ticketsData) {
      const session = await this.scheduleRepository.findOne({
        where: { id: Equal(ticket.session) },
      });
      if (!session) {
        return new Error(`Сеанс с id ${ticket.session} не найден`);
      }

      const takenPlaces = session.taken.split(',');
      const orderPlace = `${ticket.row}:${ticket.seat}`;
      if (takenPlaces.includes(orderPlace)) {
        return new Error(`Место ${orderPlace} уже занято`);
      }
    }

    const bookingData = [];
    for (const ticket of ticketsData) {
      const session = await this.scheduleRepository.findOne({
        where: { id: Equal(ticket.session) },
      });

      const taken = session.taken;
      const orderPlace = `${ticket.row}:${ticket.seat}`;
      let updateTaken: string;

      if (taken.length > 0) {
        updateTaken = taken + ',' + orderPlace;
      } else {
        updateTaken = orderPlace;
      }

      const booking = await this.scheduleRepository.update(
        { id: Equal(ticket.session) },
        { taken: updateTaken },
      );

      if (!booking) {
        return new Error(
          `При сохранении билета на сеанс ${ticket.session}, место ${orderPlace} возникла ошибка`,
        );
      }

      const orderId = faker.string.uuid();
      const orderData = { ...ticket, orderId };
      bookingData.push(orderData);
    }

    return {
      total: bookingData.length,
      items: bookingData,
    };
  }
}
