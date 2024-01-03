import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
const userRepository = database.getRepository(Userdb);

export class UpdateUserToken {
  async execute(fcmToken: string, userId: number): Promise<Userdb | undefined> {
    try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return undefined;
      }

      user.tokenDevise = fcmToken;
      await userRepository.save(user);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}