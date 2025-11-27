import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsDTO, GetSessionsDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<GetFilmsDTO> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<GetSessionsDTO> {
    return this.filmsService.findSessions(id);
  }
}
