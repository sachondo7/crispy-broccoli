import { In } from 'typeorm';
import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuotesByIds {
  async execute(quotesIds: number[]): Promise<Quotedb[]> {
    try {
      const quotes = await quoteRepository.find({
        where: { id: In(quotesIds) },
        relations: ['tariffId']
      });
      return quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      throw error;
    }
  }
}
