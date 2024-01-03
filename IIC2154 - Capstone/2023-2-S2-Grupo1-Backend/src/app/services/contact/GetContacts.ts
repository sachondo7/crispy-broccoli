import { Contactdb } from '../../../infrastructure/database/contact';
import { database } from '../../../infrastructure/database/data-source';

const contactRepository = database.getRepository(Contactdb);

export class GetContacts {
  async execute(): Promise<Contactdb[]> {
    try {
      const contacts = await contactRepository.find({
        relations: {
          client: true
        }
      });
      return contacts;
    } catch (error) {
      console.error('Error retrieving contacts:', error);
      throw error;
    }
  }
}