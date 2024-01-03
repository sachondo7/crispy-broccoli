import { Contactdb } from '../../../infrastructure/database/contact';
import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';

export class CreateContact {
  async execute(
    name: string,
    email: string,
    clientId: number
  ): Promise<Contactdb> {
    try {
      const client = await database.manager.findOne(Clientdb, {
        where: { id: clientId }
      });

      if (!client) {
        throw new Error('Client not found'); // Maneja el caso en que no se encuentre el usuario
      }

      const newContact = new Contactdb(name, email);
      newContact.client = client;
      await database.manager.save(newContact);

      return newContact;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }
}
