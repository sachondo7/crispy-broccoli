import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';

export class CreateClient {
  async execute(name: string, rut_empresa: string): Promise<Clientdb> {
    try {
      const newClient = new Clientdb(name, rut_empresa);
      newClient.quotes = []; // Inicializa quotes como un array vacío
      await database.manager.save(newClient);
      return newClient;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  }
}
