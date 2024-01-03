import { Contactdb } from '../../../infrastructure/database/contact';
import { database } from '../../../infrastructure/database/data-source';
const contactRepository = database.getRepository(Contactdb);

export class GetContactById {
  async execute(contactId: number): Promise<Contactdb> {
    try {
      const contact = await contactRepository.findOneBy({ id: contactId });
      return contact;
    } catch (error) {
      console.error('Error retrieving contact:', error);
      throw error;
    }
  }
}