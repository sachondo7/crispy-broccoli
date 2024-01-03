import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuoteById {
  async execute(quoteId: number): Promise<Quotedb> {
    try {
      const quote = await quoteRepository.findOne({
        where: { id: quoteId },
        relations: ['tariffId', 'clientId', 'userId']
      });
      return quote;
    } catch (error) {
      console.error('Error retrieving quote:', error);
      throw error;
    }
  }
}
