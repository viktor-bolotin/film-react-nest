// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { FilmDocument, IFilm } from './repository.types.mongoDB';
// import { BookingPlacesDTO } from 'src/order/dto/order.dto';

// interface IFilmsRepository {
//   getAllFilms(): Promise<IFilm[]>;
//   getSchedule(id: string): Promise<IFilm[]>;
//   bookingPlaces(orderData: BookingPlacesDTO);
//   checkFreePlace(orderData: BookingPlacesDTO): Promise<boolean>;
// }

// @Injectable()
// export class FilmsRepository implements IFilmsRepository {
//   constructor(@InjectModel('film') private filmsModel: Model<FilmDocument>) {}

//   async getAllFilms(): Promise<IFilm[]> {
//     const films = await this.filmsModel.find({});
//     return films;
//   }

//   async getSchedule(id: string): Promise<IFilm[]> {
//     const film: IFilm[] = await this.filmsModel.find({ id: id }, { _id: 0 });
//     return film;
//   }

//   async checkFreePlace(orderData: BookingPlacesDTO): Promise<boolean> {
//     const checkPlace = await this.filmsModel.findOne({
//       id: orderData.filmId,
//       'schedule.id': orderData.sessionId,
//       'schedule.taken': orderData.place,
//     });

//     return !checkPlace;
//   }

//   async bookingPlaces(orderData: BookingPlacesDTO) {
//     await this.filmsModel.updateOne(
//       {
//         id: orderData.filmId,
//         'schedule.id': orderData.sessionId,
//       },
//       { $push: { 'schedule.$.taken': [`${orderData.place}`] } },
//     );

//     return true;
//   }
// }
