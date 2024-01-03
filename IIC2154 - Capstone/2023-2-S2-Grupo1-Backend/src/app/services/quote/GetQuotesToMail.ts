import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuoteByDaysToExpireMailer {
  async execute(): Promise<Quotedb[]> {
    try {
      // Obtener la fecha actual
      const currentDate = new Date();
      // const currentDate = new Date('2023-11-09T00:00:00.000Z');
      console.log('Current date:', currentDate);
      currentDate.setHours(0, 0, 0, 0);

      const days = 5;
      // Calcular la fecha que está "days" días en el futuro

      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + days);
      futureDate.setHours(0, 0, 0, 0);
      console.log('Future date:', futureDate);

      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 2);
      endDate.setHours(0, 0, 0, 0);
      console.log('End date:', endDate);

      const futureNextDate = new Date();
      futureNextDate.setDate(futureDate.getDate() + 1);
      futureNextDate.setHours(0, 0, 0, 0);

      const endNextDate = new Date();
      endNextDate.setDate(endDate.getDate() + 1);
      endNextDate.setHours(0, 0, 0, 0);

      const quotes = await quoteRepository
        .createQueryBuilder('quote')
        .where(
          '(quote.endDate >= :futureDate AND quote.endDate < :futureNextDate) OR (quote.deliveryDate >= :futureDate AND quote.deliveryDate < :futureNextDate) OR (quote.deliveryDate >= :endDate AND quote.deliveryDate < :endNextDate)',
          { futureDate, endDate, futureNextDate, endNextDate }
        )
        .leftJoinAndSelect('quote.clientId', 'clientId')
        .leftJoinAndSelect('quote.userId', 'userId')
        .orderBy('quote.deliveryDate', 'DESC')
        .getMany();

      return quotes;
    } catch (error) {
      console.error('Error retrieving quote:', error);
      throw error;
    }
  }
}
