import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDocument, IFilm } from './repository.types';
import { BookingPlacesDTO } from 'src/order/dto/order.dto';

interface IFilmsRepository {
  getAllFilms(): Promise<IFilm[]>;
  getSchedule(id: string): Promise<IFilm[]>;
  bookingPlaces(orderData: BookingPlacesDTO);
  checkFreePlace(orderData: BookingPlacesDTO): Promise<boolean>;
}

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(@InjectModel('film') private filmsModel: Model<FilmDocument>) {}

  async getAllFilms(): Promise<IFilm[]> {
    const films = await this.filmsModel.find({});
    return films;
  }

  async getSchedule(id: string): Promise<IFilm[]> {
    const film: IFilm[] = await this.filmsModel.find({ id: id }, { _id: 0 });
    return film;
  }

  async checkFreePlace(orderData: BookingPlacesDTO): Promise<boolean> {
    const checkPlace = await this.filmsModel.findOne({
      id: orderData.filmId,
      'schedule.id': orderData.sessionId,
      'schedule.taken': orderData.place,
    });

    return !checkPlace;
  }

  async bookingPlaces(orderData: BookingPlacesDTO) {
    await this.filmsModel.updateOne(
      {
        id: orderData.filmId,
        'schedule.id': orderData.sessionId,
      },
      { $push: { 'schedule.$.taken': [`${orderData.place}`] } },
    );

    return true;
  }
}

// {
//   "title": "A Tale of Two Cities",
//     // массив
//     "subjects": ["British", "City and town life", "Classic Literature"],
//     // поддокументы
//     "author": {
//         "name": "Charles Dickens",
//         "dateOfBirth": ISODate("1812-02-07")
//     },
//     "firstEdition": {
//         "reprint": false,
//         "year": 1859,
//         // вложенность может быть любой
//         "publisher": {
//             "name": "Chapman & Hall",
//             "country": "United Kingdom"
//         }
//     },
//     // массив с документами
//     "editions": [
//         {
//             "reprint": true,
//             "year": 1942,
//             "publisher": {
//                 "name": "Classic Comics Library",
//                 "country": "United States"
//             }
//         }
//     ]
// }

// db.books.find({
//   firstEdition: {
//     year: 2018,
//         reprint: true
//   }
// });

// db.books.find({
//   "firstEdition.reprint": false
// });

// // вложенность не ограничена
// db.books.find({
//  "firstEdition.publisher.country": "United Kingdom"
// });

// db.books.find({
//   "languages": "British"
// });

// {
//     "id": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
//     "rating": 2.9,
//     "director": "Итан Райт",
//     "tags": ["Документальный"],
//     "image": "/bg1s.jpg",
//     "cover": "/bg1c.jpg",
//     "title": "Архитекторы общества",
//     "about": "Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.",
//     "description": "Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.",
//     "schedule": [{
//         "id": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
//         "daytime": "2024-06-28T10:00:53+03:00",
//         "hall": 0,
//         "rows": 5,
//         "seats": 10,
//         "price": 350,
//         "taken": []
//     }

//     {id: "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
//       "schedule.id": { "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce" }
//     }
