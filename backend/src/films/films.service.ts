import { Injectable } from '@nestjs/common';
import {
  GetFilmDTO,
  GetFilmsDTO,
  GetScheduleDTO,
  GetSessionsDTO,
} from './dto/films.dto';
import { FilmsRepository } from 'src/repository/repository';
import { IFilm, ISchedule } from 'src/repository/repository.types';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  private getFilmMapperFn(): (Film: IFilm) => GetFilmDTO {
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

  private getScheduleMapperFn(): (schedule: ISchedule) => GetScheduleDTO {
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
    const films: IFilm[] = await this.filmsRepository.getAllFilms();
    const total = films.length;
    return {
      total: total,
      items: await films.map(this.getFilmMapperFn()),
    };
  }

  async findSessions(id: string): Promise<GetSessionsDTO> {
    const film = await this.filmsRepository.getSchedule(id);
    const sessions = film[0].schedule;
    const total = sessions.length;
    return {
      total: total,
      items: await sessions.map(this.getScheduleMapperFn()),
    };
  }
}
