import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuotesByClientId {
  async execute(clientId: number): Promise<Quotedb[]> {
    try {
      const quotes = await quoteRepository.find({
        where: { clientId: { id: clientId } },
        relations: ['tariffId']
      });
      return quotes;
    } catch (error) {
      console.error('Error retrieving quote:', error);
      throw error;
    }
  }
}
