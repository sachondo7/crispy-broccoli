import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuoteByUserId {
  async execute(userId: number): Promise<Quotedb[]> {
    try {
      const quotes = await quoteRepository
        .createQueryBuilder('quote')
        .andWhere('quote.userId = :userId', { userId })
        .leftJoinAndSelect('quote.clientId', 'client')
        .leftJoinAndSelect('quote.contactId', 'contact')
        .leftJoinAndSelect('quote.tariffId', 'tariff')
        .leftJoinAndSelect('tariff.deductions', 'deductions')
        .leftJoinAndSelect('tariff.profiles', 'profiles')
        .leftJoinAndSelect('tariff.serviceId', 'serviceId')
        .getMany();
      return quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      throw error;
    }
  }
}
