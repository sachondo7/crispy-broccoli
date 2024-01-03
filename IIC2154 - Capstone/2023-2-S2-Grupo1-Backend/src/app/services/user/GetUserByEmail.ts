import { User } from '../../../domain/User';
import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
const userRepository = database.getRepository(Userdb);

export class GetUserByEmail {
  async execute(email: string): Promise<Userdb> {
    try {
      const user = await userRepository.findOne({
        where: { email: email }
      });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }
}

