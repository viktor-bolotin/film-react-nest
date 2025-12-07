import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './film.entity';
import { Equal, Repository } from 'typeorm';
import {
  GetFilmDTO,
  GetFilmsDTO,
  GetScheduleDTO,
  GetSessionsDTO,
} from './dto/films.dto';
import { Schedules } from '../order/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private filmRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  private getFilmMapperFn(): (Film: Films) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
      };
    };
  }

  private getScheduleMapperFn(): (schedule: Schedules) => GetScheduleDTO {
    return (root) => {
      return {
        id: root.id,
        daytime: root.daytime,
        hall: root.hall,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
        taken: root.taken,
      };
    };
  }

  async findAll(): Promise<GetFilmsDTO> {
    const films: Films[] = await this.filmRepository.find();
    return {
      total: films.length,
      items: films.map(this.getFilmMapperFn()),
    };
  }

  async findSessions(id: string): Promise<GetSessionsDTO> {
    const sessions = await this.scheduleRepository.find({
      where: { film: Equal(id) },
      order: {
        daytime: 'ASC',
      },
    });
    return {
      total: 1,
      items: sessions.map(this.getScheduleMapperFn()),
    };
  }
}
