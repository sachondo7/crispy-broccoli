import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';

const tariffRepository = database.getRepository(Tariffdb);

export class GetTariffs {
  async execute(): Promise<Tariffdb[]> {
    try {
      const tariffs = await tariffRepository.find({
        relations: {
          deductions: true,
          serviceId: true,
          quote: true,
          profiles: true
        }
      });
      return tariffs;
    } catch (error) {
      console.error('Error retrieving tariffs:', error);
      throw error;
    }
  }
}
