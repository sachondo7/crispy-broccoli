import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';

const clientRepository = database.getRepository(Clientdb);

export class GetClients {
  async execute(): Promise<Clientdb[]> {
    try {
      const clients = await clientRepository.find({
        relations: {
          contacts: true
        }
      });
      return clients;
    } catch (error) {
      console.error('Error retrieving clients:', error);
      throw error;
    }
  }
}
