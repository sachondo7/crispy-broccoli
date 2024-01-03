import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinTable,
  JoinColumn
} from 'typeorm';
import { Tariff } from '../../domain/Tariff';
import { Deductiondb } from './deduction';
import { Quotedb } from './quote';
import { Profiledb } from './profile';
import { Servicedb } from './service';

@Entity({ name: 'tariffdb' })
export class Tariffdb extends Tariff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column()
  priceWhitDeduction: number;

  @Column()
  grossPrice: number;

  @Column()
  monthPrice: number;

  @Column()
  proyectDuration: number;

  @Column()
  risk: number;

  @Column()
  otherCosts: number;

  // Establece la relación uno a muchos con Deduction
  @OneToMany(() => Deductiondb, (deduction) => deduction.tariffId, {
    eager: true
  })
  deductions: Deductiondb[];

  @OneToOne(() => Quotedb, (quote) => quote.tariffId)
  quote: Quotedb;

  @OneToMany(() => Profiledb, (profile) => profile.tariffId, {
    eager: true
  })
  profiles: Profiledb[];

  @ManyToOne(() => Servicedb, (service) => service.tariff, {
    eager: true
  })
  @JoinColumn({ name: 'serviceId' })
  serviceId: Servicedb;
}
