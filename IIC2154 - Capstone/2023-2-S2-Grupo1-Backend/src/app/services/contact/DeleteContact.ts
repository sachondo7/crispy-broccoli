import { Contactdb } from '../../../infrastructure/database/contact';
import { database } from '../../../infrastructure/database/data-source';
const contactRepository = database.getRepository(Contactdb);

export class DeleteContact {
  async execute(contactId: number): Promise<boolean> {
    try {
      const contact = await contactRepository.findOneBy({ id: contactId });

      if (!contact) {
        return false;
      }

      await contactRepository.remove(contact);
      return true; // Contact deleted successfully
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}