import { Profiledb } from '../../../infrastructure/database/profile';
import { database } from '../../../infrastructure/database/data-source';
const profileRepository = database.getRepository(Profiledb);

export class UpdateProfile {
  async execute(
    profileId: number,
    updatedData: Partial<Profiledb>
  ): Promise<Profiledb | undefined> {
    try {
      const profile = await profileRepository.findOneBy({ id: profileId });
      if (!profile) {
        return undefined;
      }

      Object.assign(profile, updatedData);
      await profileRepository.save(profile);
      return profile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}
