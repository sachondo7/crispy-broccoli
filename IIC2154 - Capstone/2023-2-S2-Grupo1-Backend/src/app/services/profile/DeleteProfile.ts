import { Profiledb } from '../../../infrastructure/database/profile';
import { database } from '../../../infrastructure/database/data-source';
const profileRepository = database.getRepository(Profiledb);

export class DeleteProfile {
  async execute(profileId: number): Promise<boolean> {
    try {
      const profile = await profileRepository.findOneBy({ id: profileId });

      if (!profile) {
        return false;
      }

      await profileRepository.remove(profile);
      return true; // Profile deleted successfully
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  }
}
