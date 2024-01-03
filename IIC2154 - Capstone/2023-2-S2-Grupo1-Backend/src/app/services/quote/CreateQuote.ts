import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
import { Userdb } from '../../../infrastructure/database/user';
import { Clientdb } from '../../../infrastructure/database/client';
import { GetUserById } from '../user/GetUserById';
import { Contactdb } from '../../../infrastructure/database/contact';

export class CreateQuote {
  async execute(
    startDate: Date,
    endDate: Date,
    deliveryDate: Date,
    updateDate: Date,
    status: string,
    idProyecto: string,
    userId: number,
    clientId: number,
    contactId: number
  ): Promise<Quotedb> {
    const getUserById = new GetUserById();
    const user = await getUserById.execute(userId);
    if (!user.quotes) {
      user.quotes = [];
    }

    try {
      const user = await database.manager.findOne(Userdb, {
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found'); // Maneja el caso en que no se encuentre el usuario
      }

      const client = await database.manager.findOne(Clientdb, {
        where: { id: clientId }
      });

      if (!client) {
        throw new Error('Client not found'); // Maneja el caso en que no se encuentre el cliente
      }

      const newQuote = new Quotedb(
        startDate,
        endDate,
        deliveryDate,
        status,
        idProyecto,
        user,
        client
      );
      const contact = await database.manager.findOne(Contactdb, {
        where: { id: contactId }
      });

      if (contact) {
        newQuote.contactId = contact;
      }

      newQuote.updateDate = updateDate;
      await database.manager.save(newQuote);
      return newQuote;
    } catch (error) {
      console.error('Error creating quote:', error);
      throw error;
    }
  }
}
