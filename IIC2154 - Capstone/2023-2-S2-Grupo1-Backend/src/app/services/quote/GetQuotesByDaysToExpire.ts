import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuoteByDaysToExpire {
  async execute(days: number, userId: number): Promise<Quotedb[]> {
    try {
      // Obtener la fecha actual
      const currentDate = new Date();

      // Calcular la fecha que está "days" días en el futuro
      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + days);

      const quotes = await quoteRepository
        .createQueryBuilder('quote')
        .leftJoinAndSelect('quote.clientId', 'client')
        .leftJoinAndSelect('quote.contactId', 'contact')
        .leftJoinAndSelect('quote.tariffId', 'tariff')
        .leftJoinAndSelect('tariff.deductions', 'deductions')
        .leftJoinAndSelect('tariff.profiles', 'profiles')
        .leftJoinAndSelect('tariff.serviceId', 'serviceId')
        .where('quote.deliveryDate <= :futureDate', { futureDate })
        .andWhere('quote.deliveryDate >= :currentDate', { currentDate })
        .andWhere('quote.userId = :userId', { userId })
        .orderBy('quote.deliveryDate', 'ASC')
        .getMany();

      return quotes; 
    } catch (error) {
      console.error('Error retrieving quote:', error);
      throw error;
    }
  }
}
