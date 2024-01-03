import { Contactdb } from '../../../infrastructure/database/contact';
import { database } from '../../../infrastructure/database/data-source';
const contactRepository = database.getRepository(Contactdb);

export class GetContactByEmail {
  async execute(email: string): Promise<Contactdb> {
    try {
      const contact = await contactRepository.findOneBy({ email });
      return contact;
    } catch (error) {
      console.error('Error retrieving contact:', error);
      throw error;
    }
  }
}
