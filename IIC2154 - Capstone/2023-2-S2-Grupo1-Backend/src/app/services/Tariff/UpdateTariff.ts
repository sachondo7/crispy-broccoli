import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
const tariffRepository = database.getRepository(Tariffdb);

export class UpdateTariff {
  async execute(
    tariffId: number,
    updatedData: Partial<Tariffdb>
  ): Promise<Tariffdb | undefined> {
    try {
      const tariff = await tariffRepository.findOneBy({ id: tariffId });
      if (!tariff) {
        return undefined;
      }

      Object.assign(tariff, updatedData);
      await tariffRepository.save(tariff);
      return tariff;
    } catch (error) {
      console.error('Error updating tariff:', error);
      throw error;
    }
  }
}
