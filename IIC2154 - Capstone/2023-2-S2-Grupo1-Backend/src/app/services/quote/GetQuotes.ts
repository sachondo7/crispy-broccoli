import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuotes {
  async execute(): Promise<Quotedb[]> {
    try {
      const quotes = await quoteRepository.find({
        relations: ['tariffId', 'clientId', 'userId'],
        order: {
          deliveryDate: 'DESC'
        }
      });

      return quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      throw error;
    }
  }
}
