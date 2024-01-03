import { Profiledb } from '../../../infrastructure/database/profile';
import { database } from '../../../infrastructure/database/data-source';
import { Tariffdb } from '../../../infrastructure/database/tariff'; // Importa la entidad Tariffdb


export class CreateProfile {
  async execute(
    rol: string,
    costperhour: number,
    hourAssignment: number,
    tariffId: number
  ): Promise<Profiledb> {
    try {
      const tariff = await database.manager.findOne(Tariffdb, {
        where: { id: tariffId }
      });

      if (!tariff) {
        throw new Error('Tariff not found'); // Maneja el caso en que no se encuentre el tariff
      }

      const newProfile = new Profiledb(rol, costperhour, hourAssignment);
      newProfile.tariffId = tariff;

      await database.manager.save(newProfile);
      return newProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }
}
