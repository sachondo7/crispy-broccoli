import { Contact } from '../../domain/Contact';
import { Clientdb } from './client';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Quotedb } from './quote';
 
@Entity({ name: 'contactdb' })
export class Contactdb extends Contact {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Clientdb, (client) => client.contacts)
  @JoinColumn({ name: 'clientId' })
  client: Clientdb;

  @OneToMany(() => Quotedb, (quote) => quote.contactId)
  quotes: Quotedb[];
}
