import { User } from '../../../domain/User';
import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';

const userRepository = database.getRepository(Userdb);

export class GetUsers {
  async execute(): Promise<Userdb[]> {
    try {
      const users = await userRepository.find({
        relations: {
          deductions: true
        }
      });
      return users;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  }
}