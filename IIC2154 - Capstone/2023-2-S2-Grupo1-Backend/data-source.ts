import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Userdb } from './src/infrastructure/database/user';
import { Deductiondb } from './src/infrastructure/database/deduction';
import { Tariffdb } from './src/infrastructure/database/tariff';
import { Quotedb } from './src/infrastructure/database/quote';
import { Contactdb } from './src/infrastructure/database/contact';
import { Servicedb } from './src/infrastructure/database/service';
import { Profiledb } from './src/infrastructure/database/profile';
import { Clientdb } from './src/infrastructure/database/client';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Userdb,
    Servicedb,
    Profiledb,
    Clientdb,
    Deductiondb,
    Tariffdb,
    Quotedb,
    Contactdb
  ],
  seeds: ['./src/infrastructure/database/seeds/*.seed.ts']
};

export const dataSource = new DataSource(options);
