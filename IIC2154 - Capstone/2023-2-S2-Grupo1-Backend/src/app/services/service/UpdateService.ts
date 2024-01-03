import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';
const serviceRepository = database.getRepository(Servicedb);

export class UpdateService {
  async execute(
    serviceId: number,
    updatedData: Partial<Servicedb>
  ): Promise<Servicedb | undefined> {
    try {
      const service = await serviceRepository.findOneBy({ id: serviceId });
      if (!service) {
        return undefined;
      }

      Object.assign(service, updatedData);
      await serviceRepository.save(service);
      return service;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }
}
