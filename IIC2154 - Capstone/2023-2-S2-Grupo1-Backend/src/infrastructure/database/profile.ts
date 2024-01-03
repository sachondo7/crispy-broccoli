import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { Profile } from '../../domain/Profile';
import { Tariffdb } from './tariff';

@Entity({ name: 'profiledb' })
export class Profiledb extends Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  costperhour: number;

  @Column()
  hourAssignment: number;
 
  @ManyToOne(() => Tariffdb, (tariff) => tariff.profiles)
  @JoinColumn({ name: 'tariffId' })
  tariffId: Tariffdb;
}
