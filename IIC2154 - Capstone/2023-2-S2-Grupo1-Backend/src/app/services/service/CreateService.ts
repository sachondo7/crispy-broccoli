import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';
import { Tariffdb } from '../../../infrastructure/database/tariff'; //

export class CreateService {
  async execute(type: string): Promise<Servicedb> {
    try {
      const newService = new Servicedb(type);
      await database.manager.save(newService);
      return newService;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }
}
