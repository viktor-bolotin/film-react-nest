import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedules } from '../order/schedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'double precision' })
  rating: number;
  @Column()
  director: string;
  @Column({ type: 'character varying' })
  tags: string;
  @Column()
  image: string;
  @Column()
  cover: string;
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  description: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
