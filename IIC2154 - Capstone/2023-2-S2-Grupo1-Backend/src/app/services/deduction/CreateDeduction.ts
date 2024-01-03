import { Deductiondb } from '../../../infrastructure/database/deduction';
import { Userdb } from '../../../infrastructure/database/user'; // Importa la entidad Userdb
import { Tariffdb } from '../../../infrastructure/database/tariff'; // Importa la entidad Tariffdb
import { database } from '../../../infrastructure/database/data-source';

export class CreateDeduction {
  async execute(
    authorization: boolean,
    percentage: number,
    userId: number,
    tariffId: number
  ): Promise<Deductiondb> {
    try {
      // Busca el usuario por su ID
      const user = await database.manager.findOne(Userdb, {
        where: { id: userId }
      });

      const tariff = await database.manager.findOne(Tariffdb, {
        where: { id: tariffId }
      });

      if (!user) {
        throw new Error('User not found'); // Maneja el caso en que no se encuentre el usuario
      }

      if (!tariff) {
        throw new Error('Tariff not found'); // Maneja el caso en que no se encuentre el tariff
      }

      const newDeduction = new Deductiondb(authorization, percentage);

      newDeduction.userId = user;
      newDeduction.tariffId = tariff;

      await database.manager.save(newDeduction);
      return newDeduction;
    } catch (error) {
      console.error('Error creating deduction:', error);
      throw error;
    }
  }
}
