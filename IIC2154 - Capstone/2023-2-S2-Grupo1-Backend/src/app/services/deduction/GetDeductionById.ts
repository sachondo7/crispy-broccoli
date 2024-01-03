import { Deductiondb } from '../../../infrastructure/database/deduction';
import { database } from '../../../infrastructure/database/data-source';
const deductionRepository = database.getRepository(Deductiondb);

export class GetDeductionById {
  async execute(deductionId: number): Promise<Deductiondb> {
    try {
      const deduction = await deductionRepository.findOne({
        where: { id: deductionId },
        relations: ['tariffId', 'userId'] // Cargar la relación 'user' y 'tariff'
      });
      return deduction;
    } catch (error) {
      console.error('Error retrieving deduction:', error);
      throw error;
    }
  }
}