import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';
const clientRepository = database.getRepository(Clientdb);

export class UpdateClient {
  async execute(
    clientId: number,
    updatedData: Partial<Clientdb>
  ): Promise<Clientdb | undefined> {
    try {
      const client = await clientRepository.findOneBy({ id: clientId });
      if (!client) {
        return undefined;
      }

      Object.assign(client, updatedData);
      await clientRepository.save(client);
      return client;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }
}
