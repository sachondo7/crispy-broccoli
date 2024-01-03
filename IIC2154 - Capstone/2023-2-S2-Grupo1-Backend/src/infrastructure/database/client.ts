import { Client } from '../../domain/Client';
import { Quotedb } from './quote';
import { Contactdb } from './contact';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

@Entity({ name: 'clientdb' })
export class Clientdb extends Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rut_empresa: string;

  @OneToMany(() => Quotedb, (quote) => quote.client)
  quotes: Quotedb[];

  @OneToMany(() => Contactdb, (contact) => contact.client)
  contacts: Contactdb[];
}
