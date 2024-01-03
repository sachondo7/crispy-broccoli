import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
import { Tariffdb } from '../../../infrastructure/database/tariff';
import { Profiledb } from '../../../infrastructure/database/profile';
import { Servicedb } from '../../../infrastructure/database/service';
import { Clientdb } from '../../../infrastructure/database/client';
import { DeleteTariff } from '../Tariff/DeleteTariff';
const quoteRepository = database.getRepository(Quotedb);
const tariffRepository = database.getRepository(Tariffdb);
const serviceRepository = database.getRepository(Servicedb);

export class DeleteQuote {
  async execute(quoteId: number): Promise<boolean> {
    try {
      const quote = await quoteRepository.findOne({
        where: { id: quoteId },
        relations: ['tariffId']
      });

      if (!quote) {
        return false; // Quote not found
      }

      if (quote.tariffId) {
        const deleteTariff = new DeleteTariff();
        await deleteTariff.execute(quote.tariffId.id);
      }

      await quoteRepository.remove(quote);
      return true; // Quote deleted successfully
    } catch (error) {
      console.error('Error deleting quote:', error);
      throw error;
    }
  }
}
