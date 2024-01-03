import { Clientdb } from '../../../infrastructure/database/client';
import { Contactdb } from '../../../infrastructure/database/contact';
import { database } from '../../../infrastructure/database/data-source';
const clientRepository = database.getRepository(Clientdb);
import axios from 'axios';

export class GetClientId {
  async execute(clientId: number): Promise<number | undefined> {
    try {
      const token = 'SOME-VALUE';
      const headers = {
        Authorization: `Bearer ${token}`
      };

      let clientes;

      const response = await axios.get(
        `https://tarificador.free.beeceptor.com/clients`,
        { headers }
      );

      if (response.status === 200) {
        clientes = response.data;
      } else {
        throw new Error('Failed to retrieve clients');
      }

      const selectedClient = clientes.find(
        (clientItem) => clientItem.id === clientId
      );

      if (!selectedClient) {
        console.error(`Client not found for id: ${clientId}`);
        throw new Error('Client not found'); // Throw an error for better handling
      }

      const { name, rut_empresa } = selectedClient;

      const clientEnBaseDeDatos = await clientRepository.findOneBy({
        rut_empresa
      });

      if (clientEnBaseDeDatos !== null) {
        return clientEnBaseDeDatos.id;
      }

      const newClient = new Clientdb(name, rut_empresa);
      newClient.quotes = [];
      await database.manager.save(newClient);
      for (let i = 0; i < selectedClient.contacts.length; i++) {
        const contact = selectedClient.contacts[i];
        const newContact = new Contactdb(contact.name, contact.email);
        newContact.client = newClient;
        await database.manager.save(newContact);
      }

      return newClient.id;
    } catch (error) {
      console.error('Error creating client from app.beeceptor:');
      const clientes = [
        {
          name: 'Banco Falabella',
          rut_empresa: '123456789',
          id: 1,
          contacts: [
            {
              name: 'Martin Perez',
              email: 'martin.perez@bancofalabella.cl',
              id: 1
            },
            {
              name: 'Jose Gutierrez',
              email: 'jose.gutierrez@bancofalabella.cl',
              id: 2
            },
            {
              name: 'Tomas Soto',
              email: 'tomas.soto@bancofalabella.cl',
              id: 3
            }
          ]
        },
        {
          name: 'Banco de Chile',
          rut_empresa: '42424242-1',
          id: 2,
          contacts: [
            {
              name: 'Juan Valdivieso',
              email: 'juan.valdivieso@bancochile.cl',
              id: 4
            },
            {
              name: 'Pedro Torres',
              email: 'pedro.torres@bancochile.cl',
              id: 5
            },
            {
              name: 'Maria Baeza',
              email: 'maria.baeza@bancochile.cl',
              id: 6
            },
            {
              name: 'Pedro Hernandez',
              email: 'pedro.hernandez@bancochile.cl',
              id: 7
            }
          ]
        },
        {
          name: 'Abcdin',
          rut_empresa: '20500-03',
          id: 3,
          contacts: [
            {
              name: 'Pedro Perez',
              email: 'pedro.perez@abcdin.cl',
              id: 8
            },
            {
              name: 'Luis Lopez',
              email: 'luis.lopez@abcdin.cl',
              id: 9
            }
          ]
        },
        {
          name: 'Unimarc',
          rut_empresa: '42042-421',
          id: 4,
          contacts: [
            {
              name: 'Maria Perez',
              email: 'maria.perez@unimarc.cl',
              id: 10
            }
          ]
        }
      ];

      const selectedClient = clientes.find(
        (clientItem) => clientItem.id === clientId
      );

      if (!selectedClient) {
        console.error(`Client not found for id: ${clientId}`);
        const client = await clientRepository.findOne({
          where: { id: clientId },
          relations: ['contacts']
        });
        if (client) {
          return client.id;
        }

        throw new Error('Client not found'); // Throw an error for better handling
      }

      const { name, rut_empresa } = selectedClient;

      const clientEnBaseDeDatos = await clientRepository.findOneBy({
        rut_empresa
      });

      if (clientEnBaseDeDatos !== null) {
        return clientEnBaseDeDatos.id;
      }

      const newClient = new Clientdb(name, rut_empresa);
      newClient.quotes = [];
      await database.manager.save(newClient);
      for (let i = 0; i < selectedClient.contacts.length; i++) {
        const contact = selectedClient.contacts[i];
        const newContact = new Contactdb(contact.name, contact.email);
        newContact.client = newClient;
        await database.manager.save(newContact);
      }

      return newClient.id;
    }
  }
}
