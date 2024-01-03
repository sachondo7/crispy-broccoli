import { Deductiondb } from '../../../infrastructure/database/deduction';
import { database } from '../../../infrastructure/database/data-source';
const deductionRepository = database.getRepository(Deductiondb);

export class UpdateDeduction {
  async execute(
    deductionId: number,
    updatedData: Partial<Deductiondb>
  ): Promise<Deductiondb | undefined> {
    try {
      const deduction = await deductionRepository.findOne({
        where: { id: deductionId },
        relations: ['userId', 'tariffId']
      });
      if (!deduction) {
        return undefined;
      }

      Object.assign(deduction, updatedData);
      await deductionRepository.save(deduction);
      return deduction;
    } catch (error) {
      console.error('Error updating deduction:', error);
      throw error;
    }
  }
}