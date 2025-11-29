import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Films } from '../films/film.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  daytime: Date;
  @Column('integer')
  hall: number;
  @Column('integer')
  rows: number;
  @Column('integer')
  seats: number;
  @Column()
  price: number;
  @Column()
  taken: string;

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
