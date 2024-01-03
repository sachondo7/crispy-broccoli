import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
import { type Userdb } from '../../../infrastructure/database/user';
const quoteRepository = database.getRepository(Quotedb);

export class GetQuotesToAceptDeductionAdmin {
  async execute(user: Userdb): Promise<Quotedb[]> {
    try {
      let quotes = await quoteRepository
        .createQueryBuilder('quote')
        .select()
        .leftJoinAndSelect('quote.clientId', 'client')
        .leftJoinAndSelect('quote.contactId', 'contact')
        .leftJoinAndSelect('quote.userId', 'user')
        .leftJoinAndSelect('quote.tariffId', 'tariff')
        .leftJoinAndSelect('tariff.deductions', 'deductions')
        .leftJoinAndSelect('tariff.profiles', 'profiles')
        .leftJoinAndSelect('tariff.serviceId', 'serviceId')
        .where('deductions.authorization = :authorization', {
          authorization: false
        })
        .orderBy('quote.deliveryDate', 'ASC')
        .getMany();

      if (user.type === 'administrator') {
        quotes = await quoteRepository
          .createQueryBuilder('quote')
          .select()
          .leftJoinAndSelect('quote.clientId', 'client')
          .leftJoinAndSelect('quote.contactId', 'contact')
          .leftJoinAndSelect('quote.userId', 'user')
          .leftJoinAndSelect('quote.tariffId', 'tariff')
          .leftJoinAndSelect('tariff.deductions', 'deductions')
          .leftJoinAndSelect('tariff.profiles', 'profiles')
          .leftJoinAndSelect('tariff.serviceId', 'serviceId')
          .where('deductions.authorization = :authorization', {
            authorization: false
          })
          .andWhere('deductions.percentage <= :percentage', { percentage: 15 })
          .orderBy('quote.deliveryDate', 'ASC')
          .getMany();
      }

      return quotes;
    } catch (error) {
      console.error('Error retrieving deductions:', error);
      throw error;
    }
  }
}
