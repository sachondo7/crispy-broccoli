import { User } from '../../../domain/User';
import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
const userRepository = database.getRepository(Userdb);

export class UpdateUser {
  async execute(
    userId: number,
    updatedData: Partial<Userdb>
  ): Promise<Userdb | undefined> {
    try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return undefined;
      }

      Object.assign(user, updatedData);
      await userRepository.save(user);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
