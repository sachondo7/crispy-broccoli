import Router from 'koa-router';

import axios from 'axios';

const router = new Router();

router.get('/api/clients', async (ctx) => {
  try {
    const token = 'SOME-VALUE';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(
      'https://tarificador.free.beeceptor.com/clients',
      { headers }
    );
    if (response.status !== 200) {
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while retrieving clients.' };
    }

    ctx.status = 200;
    ctx.body = response.data;
  } catch (error) {
    console.error('Error getting clients from app.beeceptor');
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
    ctx.status = 200;
    ctx.body = clientes;
  }
});

router.get('/api/clients/:id', async (ctx) => {
  try {
    const clientId = parseInt(ctx.params.id, 10);
    const token = 'SOME-VALUE';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(
      'https://tarificador.free.beeceptor.com/clients',
      { headers }
    );
    if (response.status !== 200) {
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while retrieving clients.' };
    }

    const clients = response.data;

    const selectedClient = clients.find(
      (clientItem) => clientItem.id === clientId
    );

    ctx.status = 200;
    ctx.body = selectedClient;
  } catch (error) {
    console.error('Error getting clients from app.beeceptor');
    const clients = [
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
    const clientId = parseInt(ctx.params.id, 10);

    let selectedClient;
    for (const cl of clients) {
      if (cl.id === clientId) {
        selectedClient = cl;
      }
    }

    ctx.status = 200;
    ctx.body = selectedClient;
  }
});

module.exports = router;
