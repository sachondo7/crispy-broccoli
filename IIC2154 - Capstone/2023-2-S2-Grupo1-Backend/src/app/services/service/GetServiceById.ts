import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';
const serviceRepository = database.getRepository(Servicedb);

export class GetServiceById {
  async execute(serviceId: number): Promise<Servicedb> {
    try {
      const service = await serviceRepository.findOneBy({ id: serviceId });
      return service;
    } catch (error) {
      console.error('Error retrieving service:', error);
      throw error;
    }
  }
}
