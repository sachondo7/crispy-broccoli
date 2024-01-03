import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Deduction } from '../../domain/Deduction';
import { Userdb } from './user';
import { Tariffdb } from './tariff';

@Entity({ name: 'deductiondb' })
export class Deductiondb extends Deduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorization: boolean;

  @Column()
  percentage: number;

  // Establece la relación muchos a uno con User
  @ManyToOne(() => Userdb, (user) => user.deductions)
  @JoinColumn({ name: 'userId' }) // Especifica la columna que se utiliza para la relación
  userId: Userdb;

  // Establece la relación muchos a uno con Tariff
  @ManyToOne(() => Tariffdb, (tariff) => tariff.deductions)
  @JoinColumn({ name: 'tariffId' }) // Especifica la columna que se utiliza para la relación
  tariffId: Tariffdb;
}
