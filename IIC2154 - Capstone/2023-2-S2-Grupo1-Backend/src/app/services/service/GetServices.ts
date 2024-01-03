import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';

const serviceRepository = database.getRepository(Servicedb);

export class GetServices {
  async execute(): Promise<Servicedb[]> {
    try {
      const services = await serviceRepository.find();
      return services;
    } catch (error) {
      console.error('Error retrieving services:', error);
      throw error;
    }
  }
}
