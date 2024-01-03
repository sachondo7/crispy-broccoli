import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class UpdateQuote {
  async execute(
    quoteId: number,
    updatedData: Partial<Quotedb>
  ): Promise<Quotedb | undefined> {
    try {
      const quote = await quoteRepository.findOneBy({ id: quoteId });
      if (!quote) {
        return undefined;
      }

      console.log('quote', quoteId);

      Object.assign(quote, updatedData);
      await quoteRepository.save(quote);
      return quote;
    } catch (error) {
      console.error('Error updating quote:', error);
      throw error;
    }
  }
}
