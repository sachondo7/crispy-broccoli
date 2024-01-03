import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';
import { Userdb } from '../user';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Userdb);
    await repository.insert([
      {
        name: 'Ximena Lambert',
        email: 'yerko.contreras@uc.cl',
        passwordHash: await bcrypt.hash('123456789', 5),
        type: 'administrator'
      }
    ]);

    await repository.insert([
      {
        name: 'Carlos Montecino',
        email: 'antonia.blanco@uc.cl',
        passwordHash: await bcrypt.hash('123456789', 5),
        type: 'CEO'
      }
    ]);

    await repository.insert([
      {
        name: 'Hebert Herraz',
        email: 'antonia.reyes@uc.cl',
        passwordHash: await bcrypt.hash('123456789', 5),

      }
    ]);

    await repository.insert([
      {
        name: 'Carol Villalobos',
        email: 'carol.villalobos@trebolit.cl',
        passwordHash: await bcrypt.hash('123456789', 5)
      }
    ]);
  }
}
