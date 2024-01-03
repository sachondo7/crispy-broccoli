import { Deductiondb } from '../../../infrastructure/database/deduction';
import { database } from '../../../infrastructure/database/data-source';

const deductionRepository = database.getRepository(Deductiondb);

export class GetDeductions {
  async execute(): Promise<Deductiondb[]> {
    try {
      const deductions = await deductionRepository.find({
        relations: ['tariffId', 'userId']
      });
      return deductions;
    } catch (error) {
      console.error('Error retrieving deductions:', error);
      throw error;
    }
  }
}