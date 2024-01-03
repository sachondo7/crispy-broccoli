import { Profiledb } from '../../../infrastructure/database/profile';
import { database } from '../../../infrastructure/database/data-source';
const profileRepository = database.getRepository(Profiledb);

export class GetProfileById {
  async execute(profileId: number): Promise<Profiledb> {
    try {
      const profile = await profileRepository.findOne({
        where: { id: profileId },
        relations: ['tariffId']
      });

      return profile;
    } catch (error) {
      console.error('Error retrieving profile:', error);
      throw error;
    }
  }
}
