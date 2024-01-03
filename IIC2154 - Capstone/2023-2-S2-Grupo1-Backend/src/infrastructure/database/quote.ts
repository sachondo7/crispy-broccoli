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
import { Userdb } from './user';
import { Tariffdb } from './tariff';
import { Quote } from '../../domain/Quote';
import { Clientdb } from './client';
import { Contactdb } from './contact';

@Entity({ name: 'quotedb' })
export class Quotedb extends Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  deliveryDate: Date;

  @Column()
  updateDate: Date;

  @Column()
  status: string;

  @Column()
  idProyecto: string;

  // Establece la relación uno a uno con Tariff
  @OneToOne(() => Tariffdb, (tariff) => tariff.quote, {
    eager: true
  })
  @JoinColumn({ name: 'tariffId' })
  tariffId: Tariffdb;

  @ManyToOne(() => Clientdb, (client) => client.quotes, {
    eager: true
  })
  @JoinColumn({ name: 'clientId' })
  clientId: Clientdb;

  @ManyToOne(() => Userdb, (user) => user.quotes, {
    eager: true
  })
  @JoinColumn({ name: 'userId' })
  userId: Userdb;

  @ManyToOne(() => Contactdb, (contact) => contact.quotes, {
    eager: true
  })
  @JoinColumn({ name: 'contactId' })
  contactId: Contactdb;
}
