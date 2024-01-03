import { Servicedb } from '../../../infrastructure/database/service';
import { database } from '../../../infrastructure/database/data-source';
import { GetClientById } from '../client/GetClientById';
const serviceRepository = database.getRepository(Servicedb);
import axios from 'axios';

export class GetServiceId {
  async execute(
    serviceId: number,
    clientId: number,
    actualServiceId: number
  ): Promise<number | undefined> {
    try {
      if (!clientId) {
        throw new Error('Valid client id is required');
      }
      const getClientById = new GetClientById();
      const client = await getClientById.execute(clientId);

      const token = 'SOME-VALUE';
      const headers = {
        Authorization: `Bearer ${token}`
      };

      let services;

      const response = await axios.get(
        `https://tarificador.free.beeceptor.com/services/${client.rut_empresa}`,
        { headers }
      );

      if (response.status === 200) {
        services = response.data;
      } else {
        throw new Error('Failed to retrieve services');
      }

      const selectedService = services.find(
        (serviceItem) => serviceItem.id === serviceId
      );

      if (!selectedService) {
        console.error(`Service not found for id: ${serviceId}`);
      }

      const service = await serviceRepository.findOneBy({
        id: actualServiceId
      });

      const { type } = selectedService;

      if (service !== null) {
        if (service.type === type) {
          return actualServiceId;
        }
      }
      const newService = new Servicedb(type);
      await database.manager.save(newService);
      return newService.id;
    } catch (error) {
      console.error('Error creating service from app.beeceptor:');
      const services = [
        {
          type: 'ASESORÍA',
          id: 1
        },
        {
          type: 'ASESORÍA EN ARQUITECTURA',
          id: 2
        },
        {
          type: 'ASESORÍA EN DISEÑO',
          id: 3
        },
        {
          type: 'ASESORÍA EN PROYECTOS',
          id: 4
        },
        {
          type: 'CELULA GESTIONADA',
          id: 5
        },
        {
          type: 'CELULA PRODUCTO DE CLIENTE',
          id: 6
        },
        {
          type: 'CELULA T&M',
          id: 7
        },
        {
          type: 'DESARROLLO DE ARQUITECTURA',
          id: 8
        },
        {
          type: 'DESARROLLO DE PROYECTOS',
          id: 9
        },
        {
          type: 'DESARROLLO DISEÑO',
          id: 10
        },
        {
          type: 'DESARROLLO SISTEMA FINANCIERO',
          id: 11
        },
        {
          type: 'DESARROLLO SISTEMA SEGURO',
          id: 12
        },
        {
          type: 'PROCESAMIENTO DE DATOS FINANCIERO',
          id: 13
        },
        {
          type: 'PROCESAMIENTO DE DATOS SEGUROS',
          id: 14
        },
        {
          type: 'PRODUCTO INSIGNIA DIGITAL',
          id: 15
        },
        {
          type: 'PRODUCTO STACKBIO',
          id: 16
        },
        {
          type: 'RECLUTAMIENTO Y SELECCIÓN',
          id: 17
        },
        {
          type: 'VENTAS INTERNACIONALES',
          id: 18
        },
        {
          type: 'ASESORÍA',
          id: 19
        },
        {
          type: 'ASESORÍA EN ARQUITECTURA',
          id: 20
        },
        {
          type: 'ASESORÍA EN ARQUITECTURA',
          id: 21
        },
        {
          type: 'ASESORÍA',
          id: 22
        }
      ];

      const selectedService = services.find(
        (serviceItem) => serviceItem.id === serviceId
      );

      if (!selectedService) {
        console.error(`Client not found for id: ${clientId}`);
        const service = await serviceRepository.findOne({
          where: { id: serviceId }
        });
        if (service) {
          return service.id;
        }

        console.error(`Service not found for id: ${serviceId}`);
        throw new Error('Service not found');
      }

      const { type } = selectedService;

      const service = await serviceRepository.findOneBy({
        id: actualServiceId
      });

      if (service !== null) {
        if (service.type === type) {
          return actualServiceId;
        }
      }

      const newService = new Servicedb(type);
      await database.manager.save(newService);
      return newService.id;
    }
  }
}
