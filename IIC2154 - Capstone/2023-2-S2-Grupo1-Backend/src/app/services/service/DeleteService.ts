import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';
import { Tariffdb } from '../../../infrastructure/database/tariff';
import { DeleteTariff } from '../Tariff/DeleteTariff';
const tariffRepository = database.getRepository(Tariffdb);
const serviceRepository = database.getRepository(Servicedb);

export class DeleteService {
  async execute(serviceId: number): Promise<boolean> {
    try {
      const service = await serviceRepository.findOne({
        where: { id: serviceId },
        relations: ['tariff']
      });

      if (!service) {
        return false; // Service not found
      }

      await serviceRepository.remove(service);
      return true; // Service deleted successfully
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
}
