import { Contactdb } from '../../../infrastructure/database/contact';
import { database } from '../../../infrastructure/database/data-source';
const contactRepository = database.getRepository(Contactdb);

export class UpdateContact {
  async execute(
    contactId: number,
    updatedData: Partial<Contactdb>
  ): Promise<Contactdb | undefined> {
    try {
      const contact = await contactRepository.findOneBy({ id: contactId });
      if (!contact) {
        return undefined;
      }

      Object.assign(contact, updatedData);
      await contactRepository.save(contact);
      return contact;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }
}
