import { Profiledb } from '../../../infrastructure/database/profile';
import { database } from '../../../infrastructure/database/data-source';

const profileRepository = database.getRepository(Profiledb);

export class GetProfiles {
  async execute(): Promise<Profiledb[]> {
    try {
      const profiles = await profileRepository.find({
        relations: ['tariffId']
      });
      return profiles;
    } catch (error) {
      console.error('Error retrieving profiles:', error);
      throw error;
    }
  }
}
