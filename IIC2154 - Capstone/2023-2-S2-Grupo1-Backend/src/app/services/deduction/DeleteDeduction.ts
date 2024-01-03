import { Deductiondb } from '../../../infrastructure/database/deduction';
import { Userdb } from '../../../infrastructure/database/user';
import { Tariffdb } from '../../../infrastructure/database/tariff'; // Importa la entidad Tariffdb
import { database } from '../../../infrastructure/database/data-source';

const deductionRepository = database.getRepository(Deductiondb);
const userRepository = database.getRepository(Userdb);
const tariffRepository = database.getRepository(Tariffdb);

export class DeleteDeduction {
  async execute(deductionId: number): Promise<boolean> {
    try {
      const deduction = await deductionRepository.findOne({
        where: { id: deductionId },
        relations: ['userId', 'tariffId'] // Cargar la relación 'user' y 'tariff'
      });

      if (!deduction) {
        return false; // Deduction not found
      }

      // Find the tariff to which the deduction belongs
      const tariff = await tariffRepository.findOne({
        where: { id: deduction.tariffId.id },
        relations: ['deductions']
      });

      if (tariff) {
        // Remove the deduction from the user's deductions list
        tariff.deductions = tariff.deductions.filter(
          (d) => d.id !== deductionId
        );
        await tariffRepository.save(tariff);
      }

      // Find the user to which the deduction belongs
      const user = await userRepository.findOne({
        where: { id: deduction.userId.id },
        relations: ['deductions']
      });

      if (user) {
        // Remove the deduction from the user's deductions list
        user.deductions = user.deductions.filter((d) => d.id !== deductionId);
        await userRepository.save(user);
      }

      await deductionRepository.remove(deduction);
      return true; // User deleted successfully
    } catch (error) {
      console.error('Error deleting deduction:', error);
      throw error;
    }
  }
}
