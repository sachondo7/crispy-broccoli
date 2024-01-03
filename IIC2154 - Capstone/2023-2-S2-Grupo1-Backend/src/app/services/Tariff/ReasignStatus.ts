import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);
const tariffRepository = database.getRepository(Tariffdb);

export class ReasignStatus {
  async execute(tariffId: number, status: string): Promise<Quotedb> {
    try {
      const tariff = await tariffRepository.findOne({
        where: { id: tariffId },
        relations: ['deductions', 'serviceId', 'quote', 'profiles'] // Cargar la relación 'user' y 'tariff'
      });

      if (!tariff) {
        throw new Error('Tariff not found');
      }

      if (!tariff.quote) {
        throw new Error('Quote not found');
      }

      const updateDate = new Date();
      tariff.quote.updateDate = updateDate;
      tariff.quote.status = status;
      await database.manager.save(tariff.quote);
      return tariff.quote;
    } catch (error) {
      console.error('Error updating quote:', error);
      throw error;
    }
  }
}
