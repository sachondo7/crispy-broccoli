import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
const tariffRepository = database.getRepository(Tariffdb);

export class GetTariffById {
  async execute(tariffId: number): Promise<Tariffdb> {
    try {
      const tariff = await tariffRepository.findOne({
        where: { id: tariffId },
        relations: ['deductions', 'serviceId', 'quote', 'profiles'] // Cargar la relación 'user' y 'tariff'
      });
      return tariff;
    } catch (error) {
      console.error('Error retrieving tariff:', error);
      throw error;
    }
  }
}
