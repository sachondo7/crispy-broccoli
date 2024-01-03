import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
import { Deductiondb } from '../../../infrastructure/database/deduction';
import { Profiledb } from '../../../infrastructure/database/profile';
import { Servicedb } from '../../../infrastructure/database/service';
const tariffRepository = database.getRepository(Tariffdb);
const deductionRepository = database.getRepository(Deductiondb);
const profileRepository = database.getRepository(Profiledb);

export class DeleteTariff {
  async execute(tariffId: number): Promise<boolean> {
    try {
      const tariff = await tariffRepository.findOne({
        where: { id: tariffId },
        relations: ['deductions', 'profiles'] // Cargar la relación 'user' y 'tariff'
      });

      if (!tariff) {
        return false; // Tariff not found
      }

      // Eliminar los services relacionadas con el tarifario
      await Promise.all(
        tariff.profiles.map(async (profile) => {
          await profileRepository.remove(profile);
        })
      );

      await Promise.all(
        tariff.deductions.map(async (deduction) => {
          await deductionRepository.remove(deduction);
        })
      );
      await tariffRepository.remove(tariff);
      return true; // Tariff deleted successfully
    } catch (error) {
      console.error('Error deleting tariff:', error);
      throw error;
    }
  }
}
