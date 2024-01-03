import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { User } from '../../domain/User';
import { Deductiondb } from './deduction';
import { Quotedb } from './quote';

@Entity({ name: 'userdb' })
export class Userdb extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  blocked: boolean;

  @Column()
  type: string;

  @Column()
  tokenDevise: string;

  // Establece la relación uno a muchos con Deduction
  @OneToMany(() => Deductiondb, (deduction) => deduction.userId)
  deductions: Deductiondb[];

  @OneToMany(() => Quotedb, (quote) => quote.userId)
  quotes: Quotedb[];
}
