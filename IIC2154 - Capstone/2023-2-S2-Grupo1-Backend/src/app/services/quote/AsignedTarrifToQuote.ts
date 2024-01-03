import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';

export class AsignedTarrifToQuote {
  async execute(tariffId: number, quoteId: number): Promise<Quotedb> {
    try {
      const quote = await database.manager.findOne(Quotedb, {
        where: { id: quoteId }
      });

      if (!quote) {
        throw new Error('Quote not found'); // Maneja el caso en que no se encuentre el usuario
      }

      const tariff = await database.manager.findOne(Tariffdb, {
        where: { id: tariffId }
      });

      if (!tariff) {
        throw new Error('Tariff not found'); // Maneja el caso en que no se encuentre el usuario
      }

      quote.tariffId = tariff;
      await database.manager.save(quote);
      return quote;
    } catch (error) {
      console.error('Error asigned tariff:', error);
      throw error;
    }
  }
}
