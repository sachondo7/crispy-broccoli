import { Clientdb } from '../../../infrastructure/database/client';
import { database } from '../../../infrastructure/database/data-source';
const clientRepository = database.getRepository(Clientdb);

export class GetClientByRut {
  async execute(rut: string): Promise<Clientdb> {
    try {
      if (!rut) {
        throw new Error('Valid client rut id is required');
      }

      const client = await clientRepository.findOne({
        where: { rut_empresa: rut },
        relations: ['contacts'] // Cargar la relación 'user' y 'tariff'
      });
      return client;
    } catch (error) {
      console.error('Error retrieving client:', error);
      throw error;
    }
  }
}