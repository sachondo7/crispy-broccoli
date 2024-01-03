import { Tariffdb } from '../../../infrastructure/database/tariff';
import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';
import { Quotedb } from '../../../infrastructure/database/quote';

export class CreateTariff {
  async execute(
    currency: string,
    quoteId: number,
    proyectDuration: number,
    risk: number,
    otherCosts: number,
    serviceId: number
  ): Promise<Tariffdb> {
    try {
      const service = await database.manager.findOne(Servicedb, {
        where: { id: serviceId }
      });

      if (!service) {
        throw new Error('Service not found'); // Maneja el caso en que no se encuentre el usuario
      }

      const quote = await database.manager.findOne(Quotedb, {
        where: { id: quoteId }
      });

      if (!quote) {
        throw new Error('Quote not found'); // Maneja el caso en que no se encuentre el usuario
      }

      const newTariff = new Tariffdb(
        currency,
        0,
        0,
        proyectDuration,
        risk,
        otherCosts
      );
      newTariff.deductions = []; // Inicializa deductions como un array vacío

      newTariff.serviceId = service; // Asigna el servicio al que pertenece la tarifa
      newTariff.quote = quote; // Asigna la cotización a la que pertenece la tarifa
      //console.log('newTariff', newTariff);
      await database.manager.save(newTariff);
      return newTariff;
    } catch (error) {
      console.error('Error creating tariff:', error);
      throw error;
    }
  }
}
