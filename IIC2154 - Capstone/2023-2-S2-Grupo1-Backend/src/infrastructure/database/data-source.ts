import 'reflect-metadata';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { DataSource, DataSourceOptions } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SeederOptions } from 'typeorm-extension';
import { Userdb } from './user';
import { Deductiondb } from './deduction';
import { Tariffdb } from './tariff';
import { Quotedb } from './quote';
import { Contactdb } from './contact';
import { Servicedb } from './service';
import { Profiledb } from './profile';
import { Clientdb } from './client';

const dotenvPath = path.resolve(__dirname, '../../../.env');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
require('dotenv').config({ path: dotenvPath });

const options: DataSourceOptions & SeederOptions = {
  name: process.env.CONECTION_NAME,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
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
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  seeds: ['src/infrastructure/database/seeds/*.ts'],
  subscribers: []
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const database = new DataSource(options);
