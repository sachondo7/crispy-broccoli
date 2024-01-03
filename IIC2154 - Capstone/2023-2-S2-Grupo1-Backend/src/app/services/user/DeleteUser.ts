import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
import { Deductiondb } from '../../../infrastructure/database/deduction';
import { Quotedb } from '../../../infrastructure/database/quote';
const userRepository = database.getRepository(Userdb);
const deductionRepository = database.getRepository(Deductiondb);
const quoteRepository = database.getRepository(Quotedb);

export class DeleteUser {
  async execute(userId: number): Promise<boolean> {
    try {

      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ['deductions', 'quotes'] // Cargar la relación 'user' y 'tariff'
      });

      if (!user) {
        return false; // User not found
      }

      // Eliminar las deducciones asociadas al usuario
      await Promise.all(
        user.deductions.map(async (deduction) => {
          await deductionRepository.remove(deduction);
        })
      );

      // Eliminar las cotizaciones asociadas al usuario
      await Promise.all(
        user.quotes.map(async (quote) => {
          await quoteRepository.remove(quote);
        })
      );

      await userRepository.remove(user);
      return true; // User deleted successfully
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
