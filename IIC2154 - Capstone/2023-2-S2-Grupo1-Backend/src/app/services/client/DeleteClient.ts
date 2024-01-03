import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';
import { Contactdb } from '../../../infrastructure/database/contact';
const clientRepository = database.getRepository(Clientdb);
const contacteRepository = database.getRepository(Contactdb);

export class DeleteClient {
  async execute(clientId: number): Promise<boolean> {
    try {
      const client = await clientRepository.findOne({
        where: { id: clientId },
        relations: ['contacts']
      });

      if (!client) {
        return false;
      }

      await Promise.all(
        client.contacts.map(async (contact) => {
          await contacteRepository.remove(contact);
        })
      );

      await clientRepository.remove(client);
      return true; // Client deleted successfully
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }
}
