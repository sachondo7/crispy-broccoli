import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
import { Profiledb } from '../../../infrastructure/database/profile';
const tariffRepository = database.getRepository(Tariffdb);
const profileRepository = database.getRepository(Profiledb);

export class EliminateAsociated {
  async execute(tariffId: number): Promise<Tariffdb> {
    try {
      const tariff = await tariffRepository.findOne({
        where: { id: tariffId },
        relations: ['deductions', 'serviceId', 'profiles']
      });

      if (!tariff) {
        throw new Error('tariff not found'); // Tariff not found
      }

      return tariff;
    } catch (error) {
      console.error('Error deleting tariff:', error);
      throw error;
    }
  }
}
