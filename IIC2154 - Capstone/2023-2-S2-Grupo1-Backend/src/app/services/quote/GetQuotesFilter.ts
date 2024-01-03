import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';
import { Like } from 'typeorm';

const quoteRepository = database.getRepository(Quotedb);

export class GetQuotesFilters {
  async execute(
    userId: number,
    filters: {
      clientId?: number;
      idProyecto?: string;
    }
  ): Promise<Quotedb[]> {
    try {
      const queryBuilder = quoteRepository.createQueryBuilder('quote');
      const { clientId, idProyecto } = filters;

      queryBuilder.andWhere('quote.userId = :userId', { userId });

      if (clientId !== undefined) {
        queryBuilder.andWhere('quote.clientId = :clientId', {
          clientId
        });
      }

      if (idProyecto !== undefined) {
        queryBuilder.andWhere('quote.idProyecto LIKE :idProyecto', {
          idProyecto: `%${idProyecto}%`
        });
      }

      const quotes = await queryBuilder.getMany();
      return quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      throw error;
    }
  }
}
