import { User } from '../../../domain/User';
import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
const userRepository = database.getRepository(Userdb);

export class GetUserById {
  async execute(userId: number): Promise<Userdb> {
    try {
      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ['deductions', 'quotes', 'quotes.tariffId.serviceId'] // Cargar la relación 'user' y 'tariff'
      });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }
}
