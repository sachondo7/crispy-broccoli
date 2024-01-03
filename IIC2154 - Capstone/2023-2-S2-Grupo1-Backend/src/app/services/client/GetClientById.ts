import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';
const clientRepository = database.getRepository(Clientdb);

export class GetClientById {
  async execute(clientId: number): Promise<Clientdb> {
    try {
      if (!clientId) {
        throw new Error('Valid client id is required');
      }
      const client = await clientRepository.findOne({
        where: { id: clientId },
        relations: ['contacts'] // Cargar la relación 'user' y 'tariff'
      });
      return client;
    } catch (error) {
      console.error('Error retrieving client:', error);
      throw error;
    }
  }
}
