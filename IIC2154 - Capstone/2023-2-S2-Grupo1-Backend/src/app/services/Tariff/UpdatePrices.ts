import { Tariffdb } from '../../../infrastructure/database/tariff';
import { database } from '../../../infrastructure/database/data-source';
const tariffRepository = database.getRepository(Tariffdb);

export class UpdatePrices {
  async execute(tariffId: number): Promise<Tariffdb> {
    try {
      const tariff = await tariffRepository.findOne({
        where: { id: tariffId },
        relations: ['deductions', 'serviceId', 'quote', 'profiles']
      });
      if (!tariff) {
        throw new Error('Tariff not found');
      }

      let monthPrice = 0;
      if (tariff.profiles.length > 0) {
        for (const profile of tariff.profiles) {
          monthPrice += Math.floor(
            (profile.costperhour * profile.hourAssignment) / 100
          );
        }
      }

      monthPrice += tariff.otherCosts;

      monthPrice = Math.floor(monthPrice + (monthPrice * tariff.risk) / 100);

      tariff.monthPrice = monthPrice;
      const grossPrice = monthPrice * tariff.proyectDuration;
      tariff.grossPrice = grossPrice;

      let discount = 0;
      if (tariff.deductions.length > 0) {
        let highdiscount = 0;
        for (const deduction of tariff.deductions) {
          if (deduction.authorization && deduction.percentage > highdiscount) {
            highdiscount = deduction.percentage;
          }
        }

        discount = Math.floor((monthPrice * highdiscount) / 100);
      }
 
      tariff.priceWhitDeduction = (tariff.monthPrice - discount) * tariff.proyectDuration;

      await tariffRepository.save(tariff);
      return tariff;
    } catch (error) {
      console.error('Error retrieving tariff:', error);
      throw error;
    }
  }
}
