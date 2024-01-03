import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Service } from '../../domain/Service';
import { Tariffdb } from './tariff';

@Entity({ name: 'servicedb' })
export class Servicedb extends Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Tariffdb, (tariff) => tariff.serviceId)
  @JoinColumn({ name: 'tariff' })
  tariff: Tariffdb[];
}
