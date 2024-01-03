import Router from 'koa-router';
import { GetClientById } from '../../app/services/client/GetClientById';

import axios from 'axios';

const router = new Router();

router.get('/api/services/:clientId', async (ctx) => {
  try {
    const clientId = parseInt(ctx.params.clientId, 10);
    const getClientById = new GetClientById();
    const client = await getClientById.execute(clientId);

    if (!client) {
      ctx.status = 404;
      ctx.body = { error: 'Client not found' };
      return;
    }

    const token = 'SOME-VALUE';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(
      `https://tarificador.free.beeceptor.com/services/${client.rut_empresa}`,
      { headers }
    );

    if (response.status === 200) {
      ctx.body = response.data;
    } else {
      throw new Error('Failed to retrieve services');
    }

    ctx.status = 200;
  } catch (error) {
    console.error('Error getting profiles from beeceptor:');
    ctx.status = 200;
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
    ctx.body = services;
  }
});

module.exports = router;
