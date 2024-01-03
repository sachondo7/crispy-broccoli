import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import axios from 'axios';
import { Quotedb } from '../quote';
import { Clientdb } from '../client';
import { Userdb } from '../user';
import { Servicedb } from '../service';

export default class QuoteSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(Quotedb);
    
    const userRepository = dataSource.getRepository(Userdb);
    const user1 = await userRepository.findOne({ where: { email: 'yerko.contreras@uc.cl'}});

    const quote1RequestBody = {
      clientId: 2,
      contactId: 1,
      idProyecto: 'FA-001',
      risk: 'Sin Riesgo',
      perfiles: [['Junior Developer', 50], ['Senior Developer', 20]],
      porcentajeDescuento: 3,
      proyectDuration: 3,
      userId: user1.id,
      currency: 'UF',
      service: 4,
      otherCosts: 10,
      endDate: '2023-11-14 09:00:00-03',
      deliveryDate: '2023-11-11 09:00:00-03'
    };

    await axios.post(
      'http://localhost:3000/api/quotes',
      quote1RequestBody
    );

    const quote2RequestBody = {
      clientId: 1,
      contactId: 2,
      idProyecto: 'FA-002',
      risk: 'Bajo',
      perfiles: [['QA Senior', 10], ['Developer Senior', 30]],
      porcentajeDescuento: 0,
      proyectDuration: 2,
      userId: user1.id,
      currency: 'UF',
      service: 2,
      otherCosts: 5,
      endDate: '2023-11-14 09:00:00-03',
      deliveryDate: '2023-11-10 09:00:00-03'
    };

    await axios.post(
      'http://localhost:3000/api/quotes',
      quote2RequestBody
    );

    const user3 = await userRepository.findOne({ where: { name: 'Hebert Herraz'}});

    const quote3RequestBody = {
      clientId: 4,
      contactId: 3,
      idProyecto: 'FA-003',
      risk: 'Alto',
      perfiles: [['Desarrollador backend', 10], ['Diseñador', 30], ['Tester', 40]],
      porcentajeDescuento: 5,
      proyectDuration: 3,
      userId: user3.id,
      currency: 'UF',
      service: 17,
      otherCosts: 0,
      endDate: '2023-11-20 09:00:00-03',
      deliveryDate: '2023-11-14 09:00:00-03'
    };

    await axios.post(
      'http://localhost:3000/api/quotes',
      quote3RequestBody
    );
  }
}
