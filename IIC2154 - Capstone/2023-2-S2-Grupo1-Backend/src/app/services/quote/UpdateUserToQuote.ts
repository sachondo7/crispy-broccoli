import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';

export class UpdateUserToQuote {
  async execute(userId: number, quoteId: number): Promise<Quotedb> {
    try {
      const quote = await database.manager.findOne(Quotedb, {
        where: { id: quoteId }
      });

      if (!quote) {
        throw new Error('Quote not found'); // Maneja el caso en que no se encuentre el usuario
      }

      const user = await database.manager.findOne(Userdb, {
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found'); // Maneja el caso en que no se encuentre el usuario
      }

      quote.userId = user;
      await database.manager.save(quote);
      return quote;
    } catch (error) {
      console.error('Error asigned tariff:', error);
      throw error;
    }
  }
}