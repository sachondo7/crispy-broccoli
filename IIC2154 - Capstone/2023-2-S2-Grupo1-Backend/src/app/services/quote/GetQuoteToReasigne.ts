import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuoteToReasigne {
  async execute(): Promise<Quotedb[]> {
    try {
      const quotes = await quoteRepository
        .createQueryBuilder('quote')
        .select()
        .leftJoinAndSelect('quote.clientId', 'client')
        .leftJoinAndSelect('quote.contactId', 'contact')
        .leftJoinAndSelect('quote.userId', 'user')
        .leftJoinAndSelect('quote.tariffId', 'tariff')
        .leftJoinAndSelect('tariff.deductions', 'deductions')
        .leftJoinAndSelect('tariff.profiles', 'profiles')
        .leftJoinAndSelect('tariff.serviceId', 'serviceId')
        .where('user.blocked = :blocked', {
          blocked: true
        })
        .getMany();
      return quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      throw error;
    }
  }
}
